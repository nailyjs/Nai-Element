import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class PostLoginEmailCodeBodyDTO {
  /**
   * 邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @Max(999999)
  @Min(100000)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
