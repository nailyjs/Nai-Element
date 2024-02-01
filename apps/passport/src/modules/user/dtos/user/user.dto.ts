import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteUserBodyDTO {
  /**
   * 用户注销验证的数据类型 请看schema枚举填值
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {("phone" | "email")}
   * @memberof DeleteUserBodyDTO
   */
  @IsIn(["phone", "email"])
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ["phone", "email"] })
  logoffType: "phone" | "email";
  /**
   * 如果是手机注销，这里填手机号码，如果是邮箱注销，这里填邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {string}
   * @memberof DeleteUserBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  verifiedData: string;
  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {number}
   * @memberof DeleteUserBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
