import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import WxPay from "wechatpay-node-v3";
import { WECHAT_PAY_MANAGER } from "nest-wechatpay-node-v3";
import { PayService } from "./pay.service";
import { ConfigService } from "@nestjs/config";
import { CommonLogger } from "cc.naily.element.shared";
import { PayServiceImpl, PayServiceResponse } from "../interfaces/pay.interface";
import { IWechatNotifyGCM } from "../interfaces/wechat.interface";
import { UserOrderRepository } from "cc.naily.element.database";

@Injectable()
export class WechatService implements PayServiceImpl {
  constructor(
    @Inject(WECHAT_PAY_MANAGER)
    private readonly wxPayService: WxPay,
    private readonly payService: PayService,
    private readonly configService: ConfigService,
    private readonly commonLogger: CommonLogger,
    private readonly userOrderRepository: UserOrderRepository,
  ) {}

  public async pay(openid: string, userID: number, desc: string, total: number, ip: string): Promise<PayServiceResponse> {
    const trade_no = this.payService.getOrderNo().toString();
    try {
      const results = await this.wxPayService.transactions_jsapi({
        // 描述
        description: desc,
        // 商户订单号
        out_trade_no: trade_no,
        // 通知地址
        notify_url: this.configService.getOrThrow("global.pay.wechat.notify_url"),
        // 订单金额
        amount: {
          // 总金额
          total: total,
        },
        // 交易发起者
        payer: {
          // 发起者的openid
          openid: openid,
        },
        // 场景信息
        scene_info: {
          // 发起者的ip
          payer_client_ip: ip,
        },
        // 附加数据 用于回调时识别用户
        attach: userID.toString(),
      });
      if (results.status !== 200) throw new BadRequestException(1024);
      return {
        response_data: results.data,
        trade_order_id: trade_no,
      };
    } catch (error) {
      console.log(error);
      this.commonLogger.setContext(WechatService.name);
      this.commonLogger.error(`官方微信支付发起失败`);
      throw new BadRequestException(1024);
    }
  }

  /**
   * 支付通知接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @param {string} ciphertext 加密数据
   * @param {string} associated_data 加密数据
   * @param {string} nonce 加密数据
   * @return {Promise<boolean>}
   * @memberof WechatService
   */
  public async notify(ciphertext: string, associated_data: string, nonce: string): Promise<boolean> {
    // 解密数据
    const data: IWechatNotifyGCM = this.wxPayService.decipher_gcm(ciphertext, associated_data, nonce);
    // 支付状态
    const trade_state = data.trade_state;
    // 商户订单号
    const out_trade_no = data.out_trade_no;
    if (trade_state !== "SUCCESS") return false;
    // 查询订单
    const order = await this.userOrderRepository.findOneBy({ tradeOrderID: out_trade_no });
    if (!order) return false;
    // 更新订单状态
    order.status = "success";
    await this.userOrderRepository.save(order);
    return true;
  }
}
