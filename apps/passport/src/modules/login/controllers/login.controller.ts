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
import { LoginService } from "../providers/login.service";
import { LoginByUsernamePasswordDTO } from "../dtos/login/username/password/login.post.dto";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.element.shared";
import { LoginByUsernamePasswordDataOKResponseDTO, LoginByUsernamePasswordOKResponseDTO } from "../dtos/login/username/password/login.post.res.dto";
import { SwaggerResponse } from "cc.naily.element.swagger";
import { PostLoginEmailCodeBodyDTO } from "../dtos/login/email/code/email.post.dto";
import { IdentifierService } from "cc.naily.element.auth";

@ApiTags("登录")
@Controller("login")
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly identifierService: IdentifierService,
  ) {}

  /**
   * 通过用户名密码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @param {LoginByUsernamePasswordDTO} body - 登录信息
   * @returns {Promise<LoginByUsernamePasswordDataOKResponseDTO>} 登录成功信息
   * @memberof LoginController
   */
  @Post("username/password")
  @UseInterceptors(ResInterceptor)
  @SwaggerResponse(LoginByUsernamePasswordOKResponseDTO)
  public async loginByUsernamePassword(@Body() body: LoginByUsernamePasswordDTO): Promise<LoginByUsernamePasswordDataOKResponseDTO> {
    return this.loginService.loginByUsernamePassword(body.username, body.password, body.loginType, body.loginClient, body.identifier);
  }

  /**
   * 通过邮箱验证码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @memberof LoginController
   */
  @Post("email/code")
  @UseInterceptors(ResInterceptor)
  public loginByEmailCode(@Body() body: PostLoginEmailCodeBodyDTO) {
    return this.loginService.loginByEmailCode(body.email, body.code, body.loginType, body.loginClient, body.identifier);
  }
}
