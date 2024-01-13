import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PayService {
  constructor(private readonly configService: ConfigService) {
    const value = configService.getOrThrow<string[]>("global.pay.enabled");
    if (!Array.isArray(value)) throw new Error("global.pay.enabled must be an array");
    value.forEach((payMethod) => {
      if (typeof payMethod !== "string") throw new Error("global.pay.enabled must be an array of string");
    });
  }

  /**
   * 检查支付方式是否启用
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {("xunhupay" | "wechat" | "alipay")} payMethod
   * @return {boolean}
   * @memberof PayService
   */
  public check(payMethod: "xunhupayWechat" | "xunhupayAlipay" | "wechat" | "alipay"): boolean {
    const enabled = this.configService.getOrThrow<string[]>("global.pay.enabled");
    return enabled.includes(payMethod);
  }

  /**
   * 生成订单号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {string} [str="Naily"]
   * @memberof PayService
   */
  public getOrderNo(str: string = "") {
    let outTradeNo = ""; //订单号
    for (
      let i = 0;
      i < 6;
      i++ //6位随机数，用以加在时间戳后面。
    ) {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = str + new Date().getTime() + outTradeNo; //时间戳，用来生成订单号。
    return parseInt(outTradeNo);
  }

  /**
   * 转换0.00格式为整数分
   *
   * @example 0.01 = 1
   * @example 0.1 = 10
   * @example 1 = 100
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @private
   * @param {number} text
   * @return {*}  {number}
   * @memberof PayService
   */
  public handleMoney(text: number): number {
    if (text != null && text != undefined) {
      const arr = text.toString().split(""); //转换为字符串并去除空格
      const index = arr.indexOf("."); //小数点位置
      const len = arr.length - 1; //总长度
      if (index != -1) {
        if (len - index == 1) {
          //一位小数
          return Number(text.toString().replace(".", "") + "0"); //末尾加0并转换为数字
        } else if (len - index == 2) {
          //两位小数
          return Number(text.toString().replace(".", "")); //去除小数点并转换为数字
        }
      } else {
        //整数
        return text * 100;
      }
    } else {
      return text;
    }
  }
}
