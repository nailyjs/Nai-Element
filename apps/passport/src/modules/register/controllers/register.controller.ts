/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
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
