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

import { Body, Controller, Ip, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WechatService } from "../providers/wechat.service";
import { User as UserEntity, UserOrderRepository } from "cc.naily.element.database";
import { Auth, User } from "cc.naily.element.auth";
import { ConfigService } from "@nestjs/config";
import { PayService } from "../providers/pay.service";
import { PostPayWechatBodyDTO } from "../dtos/pay/wechat/wechat.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { PayServiceImpl } from "../interfaces/pay.interface";

@ApiTags("充值")
@Controller("pay/wechat")
export class WechatController implements PayServiceImpl {
  constructor(
    private readonly payService: PayService,
    private readonly wechatService: WechatService,
    private readonly userOrderRepository: UserOrderRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 官方微信支付
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @memberof WechatController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async pay(@Body() { openid, amount }: PostPayWechatBodyDTO, @User() user: Omit<UserEntity, "password">, @Ip() ip: string) {
    const data = await this.wechatService.pay(openid, user.userID, this.configService.getOrThrow("global.pay.wechat.name"), amount, ip);
    // 在数据库里创建订单
    await this.userOrderRepository.createOrder(user, data.trade_order_id.toString(), this.payService.handleMoney(amount), "wechat", "pending");
    return data.response_data;
  }

  /**
   * 官方微信支付通知接口 请勿手动调用
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @param {Record<string, any>} { ciphertext, associated_data, nonce }
   * @memberof WechatController
   */
  @Post("notify")
  public async notify(@Body() { ciphertext, associated_data, nonce }: Record<string, any>) {
    const data = await this.wechatService.notify(ciphertext, associated_data, nonce);
    if (!data) {
      return {
        code: "FAIL",
        message: "支付失败",
      };
    }
    return;
  }
}
