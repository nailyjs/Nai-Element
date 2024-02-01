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

import { IsBooleanString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetSubscribeAppleUserStatusDTO {
  /**
   * 苹果transactionId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/25
   * @type {string}
   * @memberof GetSubscribeAppleUserStatusDTO
   */
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}

export class GetSubscribeAppleUserQueryDTO {
  /**
   * 是否沙盒环境
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {boolean}
   * @memberof GetSubscribeAppleUserQueryDTO
   */
  @IsBooleanString()
  @IsString()
  @IsOptional()
  isSandbox: boolean = false;
}
