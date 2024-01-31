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

import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class GetSubscribeAppleCheckBodyDTO {
  /**
   * 苹果应用的bundleId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  bundleId: string;
  /**
   * 苹果应用的transactionId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  /**
   * 是否是沙盒环境 默认false
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/31
   * @type {boolean}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsBoolean()
  @IsNotEmpty()
  isSandbox?: boolean = false;
}
