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
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PostLoginQrcodeConfirmBodyDTO {
  /**
   * 二维码key
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/27
   * @type {string}
   * @memberof PostLoginQrcodeConfirmBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  key: string;
}

export class PostLoginQrcodeBodyDTO {
  /**
   * 二维码key
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/27
   * @type {string}
   * @memberof PostLoginQrcodeBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  key: string;
  /**
   * 登录设备类型 `请看schema的enum正确传值`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {LoginType}
   * @memberof PostLoginQrcodeBodyDTO
   */
  @IsIn(LoginTypeArray)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: LoginTypeArray })
  loginType: LoginType;
  /**
   * 登录的客户端 用于记录设备/浏览器
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginQrcodeBodyDTO
   */
  @IsOptional()
  @IsString()
  readonly loginClient?: string;
  /**
   * 登录的设备名
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostLoginQrcodeBodyDTO
   */
  @IsOptional()
  @IsString()
  readonly loginDeviceName?: string;
  /**
   * 设备唯一标识符
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginQrcodeBodyDTO
   */
  @IsOptional()
  @IsString()
  identifier?: string;
}
