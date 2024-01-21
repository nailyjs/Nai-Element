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

export interface XunhupayBody {
  version: 1.1;
  appid: string;
  trade_order_id: number;
  total_fee: number;
  title: string;
  time: number;
  notify_url: "https://feature.light.xhhzs.cn/pay/notify";
  return_url: string;
  callback_url: string;
  nonce_str: any;
  hash?: any;
  type?: "WAP";
  payment: "wechat" | "alipay";
  wap_name: string;
  wap_url: string;
}

export interface Xunhupay {
  url: "https://api.xunhupay.com/payment/do.html";
  method: "POST";
  data: XunhupayBody;
}

export interface XunhupayNotify {
  /**
   * 商户订单号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  trade_order_id: string;
  /**
   * 	订单支付金额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {number}
   * @memberof XunhupayNotify
   */
  total_fee: number;
  /**
   * 交易号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  transaction_id: string;
  /**
   * 虎皮椒内部订单号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  open_order_id: string;
  /**
   * 	订单标题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  order_title: string;
  /**
   * 	订单状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {"OD"}
   * @memberof XunhupayNotify
   */
  status: "OD";
  /**
   * 	插件ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  plugins: string;
  /**
   * 备注
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  attach: string;
  /**
   * 支付渠道ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  appid: string;
  /**
   * 时间戳
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  time: string;
  /**
   * 随机字符串
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  nonce_str: string;
  /**
   * 	签名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  hash: string;
}
