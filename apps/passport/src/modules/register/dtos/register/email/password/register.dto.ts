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

import { DTO, DTOStatus } from "cc.naily.element.swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsRegExp, IsString, Max, MinLength } from "cc.naily.element.validator";

@DTO()
@DTOStatus(201)
export class RegisterByEmailPasswordBodyDTO {
  /**
   * 邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  username: string;
  /**
   * 密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @IsRegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {number}
   * @memberof RegisterByEmailPasswordBodyDTO
   */
  @Max(999999)
  @IsNumber()
  @IsNotEmpty()
  verifyCode: number;
}
