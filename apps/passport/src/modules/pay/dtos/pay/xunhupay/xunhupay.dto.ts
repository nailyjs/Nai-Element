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
