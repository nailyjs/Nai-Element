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

import { BadRequestException, Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { XunhupayService } from "../providers/xunhupay.service";
import { ApiTags } from "@nestjs/swagger";
import { PayControllerXunhupayBodyDTO } from "../dtos/pay/xunhupay/xunhupay.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { Xunhupay, XunhupayNotify } from "../interfaces/xunhupay.interface";
import { User as UserEntity, UserOrderRepository } from "cc.naily.element.database";
import { Auth, User } from "cc.naily.element.auth";
import { PayService } from "../providers/pay.service";
import { PayServiceImpl, PayServiceResponse } from "../interfaces/pay.interface";

@ApiTags("充值")
@Controller("pay/xunhupay")
export class XunhupayController implements PayServiceImpl {
  constructor(
    private readonly payService: PayService,
    private readonly xunhupayService: XunhupayService,
    private readonly userOrderRepository: UserOrderRepository,
  ) {}

  /**
   * 迅虎支付
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @memberof WechatController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async pay<T = Xunhupay>(@User() user: Omit<UserEntity, "password">, @Body() { amount, type }: PayControllerXunhupayBodyDTO) {
    const data = await this.xunhupayService.pay(amount, type as "xunhupayWechat" | "xunhupayAlipay");
    // 在数据库里创建订单
    await this.userOrderRepository.createOrder(
      user,
      data.trade_order_id.toString(),
      this.payService.handleMoney(amount),
      "xunhupayWechat",
      "pending",
    );
    data.trade_order_id = undefined;
    return data as PayServiceResponse<T>;
  }

  /**
   * 迅虎微信支付回调 请勿调用
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {*} body
   * @memberof PayController
   */
  @Post("notify")
  public async notify(@Body() body: XunhupayNotify) {
    const updated = await this.userOrderRepository.updateStatus(body.trade_order_id);
    if (!updated) throw new BadRequestException(1022);
    return "success";
  }
}
