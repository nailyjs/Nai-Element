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

import { IsNotEmpty, IsNumber, IsString, MaxPoint, Min } from "cc.naily.element.validator";

export class PostPayWechatBodyDTO {
  /**
   * 用户的openid
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @type {string}
   * @memberof PostPayWechatBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly openid: string;

  /**
   * 金额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @type {number}
   * @memberof PostPayWechatBodyDTO
   */
  @MaxPoint(2)
  @Min(0.01)
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}
