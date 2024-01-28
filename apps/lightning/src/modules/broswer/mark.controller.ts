import { Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BrowserBookMarkRepository, User as UserEntity, UserRepository } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { PostBrowserMarkBodyDTO, PostBrowserMarkQueryDTO } from "./dtos/broswer/broswermark/broswermark.dto";
import { Auth, User } from "cc.naily.element.auth";

@ApiTags("浏览器书签")
@Controller("broswer/mark")
export class BrowserMarkController {
  constructor(
    private readonly browserBookMarkRepository: BrowserBookMarkRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * 获取所有历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @return {*}  {Promise<unknown>}
   * @memberof BrowserMarkController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public async getList(@Query() query: PostBrowserMarkQueryDTO): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    return this.browserBookMarkRepository.find({
      take: query.take,
      skip: query.skip,
    });
  }

  /**
   * 更新所有历史记录
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
  public async create(@Body() body: PostBrowserMarkBodyDTO[], @User() user: UserEntity): Promise<unknown> {
    const data = await this.browserBookMarkRepository.find();
    await this.browserBookMarkRepository.remove(data);
    const userInstance = await this.userRepository.findOneBy({ userID: user.userID });
    const result = [];
    for (const item of body) {
      const data = this.browserBookMarkRepository.createBookmark(userInstance, item.title, item.icon, item.color, item.link, item.index);
      result.push(data);
    }
    return await this.browserBookMarkRepository.save(result);
  }
}
