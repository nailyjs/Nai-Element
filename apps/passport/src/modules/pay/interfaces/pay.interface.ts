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

export interface PayServiceImpl {
  /**
   * 支付服务接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @template T
   * @param {...any[]} args 传入参数
   * @return {Promise<PayServiceResponse<T>>}
   * @memberof PayServiceImpl
   */
  pay<T>(...args: any[]): Promise<PayServiceResponse<T>>;
  /**
   * 支付通知接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @param {...any[]} args
   * @return {*}  {Promise<any>}
   * @memberof PayServiceImpl
   */
  notify?(...args: any[]): Promise<any>;
}

export interface PayServiceResponse<T = any> {
  trade_order_id: string;
  response_data: T;
}
