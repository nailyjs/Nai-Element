/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
  @Inject(WECHAT_PAY_MANAGER)
  private readonly wxPayService: WxPay;
  @Inject()
  private readonly payService: PayService;
  @Inject()
  private readonly configService: ConfigService;
  @Inject()
  private readonly commonLogger: CommonLogger;
  @Inject()
  private readonly userOrderRepository: UserOrderRepository;

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
    try {
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
    } catch (error) {
      console.error(error);
      this.commonLogger.setContext(WechatService.name);
      this.commonLogger.error(`官方微信支付通知失败`);
      return false;
    }
  }
}
