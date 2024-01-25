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

import { ApiProperty } from "@nestjs/swagger";
import { LoginType, LoginTypeArray } from "cc.naily.element.auth";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "cc.naily.element.validator";

export class LoginByUsernamePasswordDTO {
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @type {string}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  /**
   * 密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @type {string}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  /**
   * 登录类型
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {("watchOS" | "Android" | "Web")}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsIn(LoginTypeArray)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: LoginTypeArray })
  readonly loginType: LoginType;
  /**
   * 登录的客户端 用于记录设备/浏览器
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsOptional()
  @IsString()
  readonly loginClient?: string;
  /**
   * 登录标识符 整个系统该登录类型的唯一标识符
   *
   * 其中，`Web`端为空则不记录设备
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof LoginByUsernamePasswordDTO
   */
  @IsOptional()
  @IsString()
  readonly identifier?: string;
}
