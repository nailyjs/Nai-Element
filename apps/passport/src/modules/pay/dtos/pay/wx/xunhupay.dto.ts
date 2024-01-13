import { MaxPoint } from "cc.naily.element.validator";
import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class PayControllerXunhupayBodyDTO {
  /**
   * 支付金额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {number}
   * @memberof WechatControllerXunhupayBodyDTO
   */
  @MaxPoint(2)
  @Min(0.01)
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  /**
   * 支付方式 xunhupayWechat 迅虎微信支付 xunhupayAlipay 迅虎支付宝支付
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @type {string}
   * @memberof PayControllerXunhupayBodyDTO
   */
  @IsIn(["xunhupayWechat", "xunhupayAlipay"])
  @IsString()
  @IsNotEmpty()
  readonly type: string = "xunhupayWechat";
}
