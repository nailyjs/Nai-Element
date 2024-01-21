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

import { Body, Controller, Ip, Post, UseInterceptors } from "@nestjs/common";
import { RegisterByEmailPasswordBodyDTO } from "../dtos/register/email/password/register.dto";
import { ApiTags } from "@nestjs/swagger";
import { CommonLogger, ResInterceptor } from "cc.naily.element.shared";
import { RegisterService } from "../providers/register.service";
import { EmailService } from "../../../providers/email.service";

@ApiTags("注册")
@Controller("register")
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly emailService: EmailService,
    private readonly commonLogger: CommonLogger,
  ) {}

  /**
   * 通过邮箱验证码和密码注册
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @memberof RegisterController
   */
  @Post("email/password")
  @UseInterceptors(ResInterceptor)
  public async registerByEmailPassword(@Body() body: RegisterByEmailPasswordBodyDTO, @Ip() ip: string) {
    await this.emailService.checkCode(body.email, body.verifyCode);
    const user = await this.registerService.registerByEmailPassword(body.email, body.username, body.password, ip);
    this.emailService.deleteCode(body.email).then();
    this.commonLogger.setContext(RegisterController.name);
    this.commonLogger.log(`用户注册成功 ${JSON.stringify(user)}`);
    return { user };
  }
}
