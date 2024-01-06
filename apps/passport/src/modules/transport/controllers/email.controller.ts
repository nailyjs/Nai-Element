import { BadRequestException, Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { EmailService } from "../../../providers/email.service";
import { ResInterceptor } from "cn.watchrss.element.shared";
import { SendEmailVerifyCodeBodyDTO } from "../dtos/transport/email/email.dto";
import { Throttle } from "@nestjs/throttler";
import { SwaggerResponse } from "cn.watchrss.element.swagger";
import { SendEmailVerifyCode201ResDTO, SendEmailVerifyCode429ResDTO } from "../dtos/transport/email/email.res.dto";

@Controller("transport")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 发送邮箱验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/07
   * @param {SendEmailVerifyCodeBodyDTO} body
   * @return {*}
   * @memberof EmailController
   */
  @Post("email")
  @UseInterceptors(ResInterceptor)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @SwaggerResponse(SendEmailVerifyCode429ResDTO)
  @SwaggerResponse(SendEmailVerifyCode201ResDTO)
  public async sendEmailVerifyCode(@Body() body: SendEmailVerifyCodeBodyDTO) {
    const result = await this.emailService.sendCode(body.email);
    if (result) {
      return 1012;
    } else {
      throw new BadRequestException(1013);
    }
  }
}
