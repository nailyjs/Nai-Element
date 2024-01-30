import { Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
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
    const canFind = this.browserMarkService.canFind(user.userID);
    if (!canFind) return await this.getList(query, user);
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
    const data = await this.browserBookMarkRepository.find();
    const userInstance = await this.userRepository.findOneBy({ userID: user.userID });
    let result: BrowserBookMark[] = [];
    for (const item of body.list) {
      const data = this.browserBookMarkRepository.createBookmark(userInstance, item.title, item.icon, item.color, item.link, item.index);
      result.push(data);
    }
    this.browserMarkService.addUpdating(user.userID);
    result = await this.browserBookMarkRepository.save(result);
    await this.browserBookMarkRepository.remove(data);
    this.browserMarkService.removeUpdating(user.userID);
    for (const item of result) {
      item.user = undefined;
    }
    return 1000;
  }
}
