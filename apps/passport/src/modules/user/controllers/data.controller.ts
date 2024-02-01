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

import { Body, Controller, Delete, Get, Post, UseInterceptors } from "@nestjs/common";
import { UserDataService } from "../providers/data.service";
import { ResInterceptor } from "cc.naily.element.shared";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { GetUserDataBodyDTO, SetUserDataBodyDTO } from "../dtos/user/data/data.get.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("用户数据")
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
