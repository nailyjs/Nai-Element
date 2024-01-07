import { Body, Controller, Ip, Post, UseInterceptors } from "@nestjs/common";
import { RegisterByEmailPasswordBodyDTO } from "../dtos/register/email/password/register.dto";
import { ApiTags } from "@nestjs/swagger";
import { EmailService } from "../../../providers/email.service";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("注册")
@Controller("register")
export class RegisterController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 通过邮箱密码注册
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @memberof RegisterController
   */
  @Post("email/password")
  @UseInterceptors(ResInterceptor)
  public async registerByEmailPassword(@Body() body: RegisterByEmailPasswordBodyDTO, @Ip() ip: string) {
    await this.emailService.checkCode(body.email, body.verifyCode);
    const user = await this.emailService.registerByEmailPassword(body.email, body.username, body.password, ip);
    this.emailService.deleteCode(body.email);
    return { user };
  }
}
