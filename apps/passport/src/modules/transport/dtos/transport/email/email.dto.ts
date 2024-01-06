import { IsEmail, IsString } from "class-validator";

export class SendEmailVerifyCodeBodyDTO {
  /**
   * 邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/07
   * @type {string}
   * @memberof SendEmailVerifyCodeBodyDTO
   */
  @IsEmail()
  @IsString()
  email: string;
}
