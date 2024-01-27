import { Body, Controller, Delete, Get, Post, UseInterceptors } from "@nestjs/common";
import { UserDataService } from "../providers/data.service";
import { ResInterceptor } from "cc.naily.element.shared";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { GetUserDataBodyDTO, SetUserDataBodyDTO } from "../dtos/user/data/data.get.dto";

@Controller("user/data")
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  /**
   * 获取用户数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @memberof UserDataController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getUserData(@Body() body: GetUserDataBodyDTO, @User() user: UserEntity): Promise<unknown> {
    return await this.userDataService.getUserData(user, body.namespace, body.key);
  }

  /**
   * 设置用户数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {*} body
   * @param {UserEntity} user
   * @return {*}  {Promise<unknown>}
   * @memberof UserDataController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async setUserData(@Body() body: SetUserDataBodyDTO, @User() user: UserEntity): Promise<unknown> {
    return await this.userDataService.setUserData(user, body.namespace, body.key, body.value);
  }

  /**
   * 删除用户数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {SetUserDataBodyDTO} body
   * @param {UserEntity} user
   * @return {*}  {Promise<unknown>}
   * @memberof UserDataController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async deleteUserData(@Body() body: SetUserDataBodyDTO, @User() user: UserEntity): Promise<unknown> {
    return await this.userDataService.deleteUserData(user, body.namespace, body.key);
  }
}
