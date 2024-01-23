import { IsString } from "class-validator";

/**
 * @author ipadhim <ipadhim@qq.com>
 */
export class PostGoogleReCaptchaTokenBodyDTO {
  /**
   * ReCaptcha验证Token
   *
   * @author ipadhim <ipadhim@qq.com>
   * @type {string}
   */
  @IsString()
  readonly token: string;
}
