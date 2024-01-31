/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { BadRequestException, Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { BrowserTrack, BrowserTrackRepository, User as UserEntity } from "cc.naily.element.database";
import { GetBrowserTrackListQueryDTO, PostBrowserTrackBodyDTO } from "./dtos/broswer/broswertrack/broswertrack.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";

@ApiTags("浏览历史记录")
@Controller("broswer/track")
export class BrowserTrackController {
  constructor(private readonly browserTrackRepository: BrowserTrackRepository) {}

  /**
   * 获取历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @return {*}
   * @memberof BrowserTrackController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getList(@Query() query: GetBrowserTrackListQueryDTO, @User() user: UserEntity): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    const data = await this.browserTrackRepository.find({
      take: query.take,
      skip: query.skip,
      where: { user: { userID: user.userID } },
      order: {
        updatedAt: "DESC",
      },
    });
    for (const item of data) {
      item.user = undefined;
    }
    return data;
  }

  /**
   * 创建历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {PostBrowserTrackBodyDTO} body
   * @param {UserEntity} user
   * @return {*}
   * @memberof BrowserTrackController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async create(@Body() body: PostBrowserTrackBodyDTO, @User() user: UserEntity): Promise<unknown> {
    const browserTrack = new BrowserTrack();
    browserTrack.user = user;
    browserTrack.webPageLink = body.webPageLink;
    browserTrack.webPageTitle = body.webPageTitle;
    browserTrack.updatedAt = body.updatedAt;
    return await this.browserTrackRepository.save(browserTrack);
  }

  /**
   * 删除历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {number} browserTrackID
   * @param {UserEntity} user
   * @memberof BrowserTrackController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async delete(@Query("browserTrackID") browserTrackID: string, @User() user: UserEntity) {
    const browserTrack = await this.browserTrackRepository.findOneBy({ browserTrackID, user: { userID: user.userID } });
    if (!browserTrack) throw new BadRequestException(1047);
    await this.browserTrackRepository.remove(browserTrack);
    return 1000;
  }

  @Auth()
  @Delete("all")
  @UseInterceptors(ResInterceptor)
  public async deleteAll(@User() user: UserEntity) {
    await this.browserTrackRepository.delete({ user: { userID: user.userID } });
    return 1000;
  }
}
