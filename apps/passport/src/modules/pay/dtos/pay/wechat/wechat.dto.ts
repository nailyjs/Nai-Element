import { IsNotEmpty, IsNumber, IsString, MaxPoint, Min } from "cc.naily.element.validator";

export class PostPayWechatBodyDTO {
  /**
   * 用户的openid
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @type {string}
   * @memberof PostPayWechatBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly openid: string;

  /**
   * 金额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @type {number}
   * @memberof PostPayWechatBodyDTO
   */
  @MaxPoint(2)
  @Min(0.01)
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}
