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

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetFileQueryDTO {
  /**
   * 文件路径
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof GetFileQueryDTO
   */
  @IsString()
  @IsNotEmpty()
  path: string;
  /**
   * 下一页
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof GetFileQueryDTO
   */
  @IsOptional()
  @IsString()
  next?: string;
}
