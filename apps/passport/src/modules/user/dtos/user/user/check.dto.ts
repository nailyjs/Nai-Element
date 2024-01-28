import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class PostUserCheckUsernameBodyDTO {
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostUserCheckUsernameBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class PostUserCheckPhoneBodyDTO {
  /**
   * 手机号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostUserCheckPhoneBodyDTO
   */
  @IsMobilePhone("zh-CN")
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class PostUserCheckEmailBodyDTO {
  /**
   * 邮箱
   *
   * @type {string}
   * @memberof PostUserCheckEmailBodyDTO
   */
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
