import { IsNotEmpty, IsString } from "cc.naily.element.validator";

export class LoginByUsernamePasswordDTO {
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @type {string}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  /**
   * 密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @type {string}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
