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

import { BadRequestException, Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { EmailService } from "../../../providers/email.service";
import { ResInterceptor } from "cc.naily.element.shared";
import { SendEmailVerifyCodeBodyDTO } from "../dtos/transport/email/email.dto";
import { Throttle } from "@nestjs/throttler";
import { SwaggerResponse } from "cc.naily.element.swagger";
import { SendEmailVerifyCode201ResDTO, SendEmailVerifyCode429ResDTO } from "../dtos/transport/email/email.res.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("传输")
@Controller("transport")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 发送邮箱验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/07
   * @param {SendEmailVerifyCodeBodyDTO} body
   * @return {Promise<number>} 1012: 发送成功 1013: 发送失败
   * @memberof EmailController
   */
  @Post("email")
  @UseInterceptors(ResInterceptor)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @SwaggerResponse(SendEmailVerifyCode429ResDTO)
  @SwaggerResponse(SendEmailVerifyCode201ResDTO)
  public async sendEmailVerifyCode(@Body() body: SendEmailVerifyCodeBodyDTO): Promise<number> {
    const result = await this.emailService.sendCode(body.email);
    if (result) {
      return 1012;
    } else {
      throw new BadRequestException(1013);
    }
  }
}
