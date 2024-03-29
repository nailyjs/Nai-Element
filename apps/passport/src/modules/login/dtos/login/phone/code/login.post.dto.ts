import { ApiProperty } from "@nestjs/swagger";
import { LoginType, LoginTypeArray } from "cc.naily.element.auth";
import { IsIn, IsInt, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class PostLoginPhoneCodeBodyDTO {
  /**
   * 邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsMobilePhone("zh-CN")
  @IsString()
  @IsNotEmpty()
  phone: string;

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
  /**
   * 登录设备类型 `请看schema的enum正确传值`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {LoginType}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsIn(LoginTypeArray)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: LoginTypeArray })
  loginType: LoginType;
  /**
   * 登录的客户端 用于记录设备/浏览器
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  readonly loginClient?: string;
  /**
   * 登录的设备名
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostLoginPhoneCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  readonly loginDeviceName?: string;
  /**
   * 设备唯一标识符
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  identifier?: string;
}
