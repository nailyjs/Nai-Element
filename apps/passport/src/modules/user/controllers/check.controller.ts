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

import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserRepository } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { PostUserCheckEmailBodyDTO, PostUserCheckPhoneBodyDTO, PostUserCheckUsernameBodyDTO } from "../dtos/user/user/check.dto";

@ApiTags("用户")
@Controller("user/check")
export class UserCheckController {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 检查手机号是否存在
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {*} body
   * @memberof UserCheckController
   */
  @Post("username")
  @UseInterceptors(ResInterceptor)
  public async checkUsername(@Body() body: PostUserCheckUsernameBodyDTO) {
    const user = await this.userRepository.checkUsername(body.username);
    if (!user) return 1050;
    return 1048;
  }

  /**
   * 检查手机号是否存在
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {*} body
   * @return {*}
   * @memberof UserCheckController
   */
  @Post("phone")
  @UseInterceptors(ResInterceptor)
  public async checkPhone(@Body() body: PostUserCheckPhoneBodyDTO) {
    const user = await this.userRepository.checkPhone(body.phone);
    if (!user) return 1052;
    return 1049;
  }

  /**
   * 检查邮箱是否存在
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {*} body
   * @return {*}
   * @memberof UserCheckController
   */
  @Post("email")
  @UseInterceptors(ResInterceptor)
  public async checkEmail(@Body() body: PostUserCheckEmailBodyDTO) {
    const user = await this.userRepository.checkEmail(body.email);
    if (!user) return 1009;
    return 1051;
  }
}
