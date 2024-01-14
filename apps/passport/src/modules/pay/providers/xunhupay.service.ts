import "axios";
import md5 from "md5";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { PayService } from "./pay.service";
import { Xunhupay, XunhupayBody } from "../interfaces/xunhupay.interface";
import { PayServiceImpl, PayServiceResponse } from "../interfaces/pay.interface";

@Injectable()
export class XunhupayService implements PayServiceImpl {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly payService: PayService,
  ) {}

  /**
   * 迅虎微信支付签名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @private
   * @param {XunhupayBody} params
   * @param {string} key
   * @return {string}
   * @memberof WechatService
   */
  private wxPaySign(params: XunhupayBody, key: string): string {
    const paramsArr = Object.keys(params);
    paramsArr.sort();
    const stringArr = [];
    paramsArr.map((key) => {
      stringArr.push(key + "=" + params[key]);
    });
    // 最后加上 商户Key
    let paramStr = stringArr.join("&");
    paramStr = paramStr + key;
    return md5(paramStr).toString().toLowerCase();
  }

  /**
   * 迅虎微信支付
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {number} amount
   * @param {string} title
   * @memberof WechatService
   */
  public async pay<T = Xunhupay>(
    amount: number,
    type: "xunhupayWechat" | "xunhupayAlipay",
    title: string = this.configService.get(`global.pay.${type}.name`) ? this.configService.get(`global.pay.${type}.name`) : "充值",
  ): Promise<PayServiceResponse<T>> {
    // 检查是否开启迅虎支付
    if (this.payService.check(type) === false) throw new BadRequestException(1018);

    let xunhupay: Record<string, any>;
    try {
      xunhupay = this.configService.getOrThrow("global.pay.xunhupayWechat");
      if (!xunhupay.appid) throw new InternalServerErrorException(1019);
      if (!xunhupay.appsecret) throw new InternalServerErrorException(1020);
    } catch (error) {
      throw new InternalServerErrorException(1021);
    }

    // 组装基本的请求参数
    const trade_order_id = this.payService.getOrderNo();
    const request: Xunhupay = {
      url: xunhupay.gateway ? xunhupay.gateway : "https://api.xunhupay.com/payment/do.html",
      method: "POST",
      data: {
        version: 1.1,
        appid: `${xunhupay.appid}`,
        trade_order_id: trade_order_id,
        total_fee: amount,
        title: title,
        time: new Date().getTime(),
        notify_url: xunhupay.return_url,
        return_url: xunhupay.return_url,
        callback_url: xunhupay.callback_url,
        nonce_str: new Date().getTime(),
        payment: type === "xunhupayWechat" ? "wechat" : "alipay",
        wap_name: "心电社区",
        wap_url: "https://watchrss.cn",
      },
    };
    // 生成签名
    const hash = this.wxPaySign(request.data, xunhupay.appsecret);
    // 传入签名到请求参数
    request.data.hash = hash;
    // 发起请求
    const { data } = await this.httpService.request(request).toPromise();
    // 检查是否请求成功 0即为成功
    if (data.errcode !== 0) throw new BadRequestException(data.errmsg);

    // 返回请求结果
    return {
      trade_order_id: trade_order_id.toString(),
      response_data: data,
    };
  }
}
