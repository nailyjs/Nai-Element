import { BadRequestException, Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { BrowserTrack, BrowserTrackRepository, User as UserEntity } from "cc.naily.element.database";
import { GetBrowserTrackListQueryDTO, PostBrowserTrackBodyDTO } from "./dtos/broswer/broswertrack/broswertrack.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";

@ApiTags("浏览")
@Controller("broswer/browserTrack")
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
  public async delete(@Query("browserTrackID") browserTrackID: number, @User() user: UserEntity) {
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
