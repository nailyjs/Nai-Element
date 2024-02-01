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

import { Body, Controller, Delete, ForbiddenException, Get, Put, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../providers/user.service";
import { ResInterceptor } from "cc.naily.element.shared";
import { SwaggerResponse } from "cc.naily.element.swagger";
import { GetLoggingUser200ResDTO } from "../dtos/user/logging/logging.res.dto";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity, UserRepository } from "cc.naily.element.database";
import { PutUserAvatarBodyDTO } from "../dtos/user/avatar/avatar.dto";
import { PutUserUsernameBodyDTO } from "../dtos/user/username/username.put.dto";
import { DeleteUserBodyDTO } from "../dtos/user/user.dto";
import { isEmail, isMobilePhone } from "class-validator";
import { EmailService } from "../../../providers/email.service";
import { PhoneService } from "../../../providers/phone.service";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly phoneService: PhoneService,
  ) {}

  /**
   * 获取已登录用户信息
   *
   * @memberof UserController
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  @Auth()
  @Get("logging")
  @UseInterceptors(ResInterceptor)
  @SwaggerResponse(GetLoggingUser200ResDTO)
  public getLoggingUser(@User() user: Omit<UserEntity, "password">) {
    return this.userService.getUserByLogging(user.userID);
  }

  /**
   * 更新头像
   *
   * @description 返回值为`Promise<any>`，因为`User`实体swagger文档它找不到，会报错，所以这里用`any`代替
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @memberof UserController
   */
  @Auth()
  @Put("avatar")
  @UseInterceptors(ResInterceptor)
  public updateAvatar(@Body() { url }: PutUserAvatarBodyDTO, @User() user: UserEntity): Promise<unknown> {
    return this.userService.updateAvatar(url, user.userID);
  }

  /**
   * 更新用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {PutUserUsernameBodyDTO} { username }
   * @param {UserEntity} user
   * @memberof UserController
   */
  @Auth()
  @Put("username")
  @UseInterceptors(ResInterceptor)
  public updateUsername(@Body() { username }: PutUserUsernameBodyDTO, @User() user: UserEntity): Promise<unknown> {
    return this.userService.updateUsername(username, user.userID);
  }

  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async deleteUser(@User() user: UserEntity, @Body() body: DeleteUserBodyDTO): Promise<unknown> {
    if (body.logoffType === "phone" && !isMobilePhone(body.verifiedData, "zh-CN")) throw new ForbiddenException(1057);
    if (body.logoffType === "email" && !isEmail(body.logoffType)) throw new ForbiddenException(1058);
    if (body.logoffType === "email") {
      await this.emailService.checkCode(body.verifiedData, body.code);
    } else if (body.logoffType === "phone") {
      await this.phoneService.checkCode(body.verifiedData, body.code);
    }
    const userInstance = this.userRepository.findOneBy({ userID: user.userID });
    if (!userInstance) throw new ForbiddenException(1015);
    return this.userRepository.logoff(user);
  }
}
