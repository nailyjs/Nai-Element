import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class PostTransportSmsBodyDTO {
  /**
   * 中国手机号码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/26
   * @type {string}
   * @memberof PostTransportSmsBodyDTO
   */
  @IsMobilePhone("zh-CN")
  @IsString()
  @IsNotEmpty()
  phone: string;
}
