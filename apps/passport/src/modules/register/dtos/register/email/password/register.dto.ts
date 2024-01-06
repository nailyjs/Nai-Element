import { DTO, DTOStatus } from "cn.watchrss.element.swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsRegExp, IsString, MinLength } from "cn.watchrss.element.validator";

@DTO()
@DTOStatus(201)
export class RegisterByEmailPasswordBodyDTO {
  /**
   * 邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  username: string;
  /**
   * 密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsRegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {number}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsNumber()
  @IsNotEmpty()
  verifyCode: number;
}
