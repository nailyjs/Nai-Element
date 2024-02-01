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

import { BadRequestException, Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BrowserBookMark, BrowserBookMarkRepository, User as UserEntity, UserRepository } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { PostBrowserMarkBodyDTO, PostBrowserMarkQueryDTO } from "./dtos/broswer/broswermark/broswermark.dto";
import { Auth, User } from "cc.naily.element.auth";
import { BrowserMarkService } from "./ mark.service";

@ApiTags("浏览器书签")
@Controller("broswer/mark")
export class BrowserMarkController {
  constructor(
    private readonly browserBookMarkRepository: BrowserBookMarkRepository,
    private readonly userRepository: UserRepository,
    private readonly browserMarkService: BrowserMarkService,
  ) {}

  /**
   * 获取所有书签
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @return {*}  {Promise<unknown>}
   * @memberof BrowserMarkController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getList(@Query() query: PostBrowserMarkQueryDTO, @User() user: UserEntity): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    const canFind = this.browserMarkService.getState({ userID: user.userID });
    if (!canFind) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getList(query, user));
        }, 100);
      });
    }
    return this.browserBookMarkRepository.find({
      take: query.take,
      skip: query.skip,
      where: { user: { userID: user.userID } },
    });
  }

  /**
   * 更新所有书签
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {PostBrowserMarkBodyDTO[]} body
   * @return {*}  {Promise<unknown>}
   * @memberof BrowserMarkController
   */
  @Auth()
  @Post("all")
  @UseInterceptors(ResInterceptor)
  public async create(@Body() body: PostBrowserMarkBodyDTO, @User() user: UserEntity): Promise<unknown> {
    if (!this.browserMarkService.getState({ userID: user.userID })) throw new BadRequestException(1054);
    this.browserMarkService.setState({ userID: user.userID });
    const data = await this.browserBookMarkRepository.find({ where: { user: { userID: user.userID } } });
    const userInstance = await this.userRepository.findOneBy({ userID: user.userID });
    let result: BrowserBookMark[] = [];
    for (const item of body.list) {
      const data = this.browserBookMarkRepository.createBookmark(userInstance, item.title, item.icon, item.color, item.link, item.index);
      result.push(data);
    }
    try {
      result = await this.browserBookMarkRepository.save(result);
      await this.browserBookMarkRepository.remove(data);
    } finally {
      this.browserMarkService.removeState({ userID: user.userID });
      return 1000;
    }
  }
}
