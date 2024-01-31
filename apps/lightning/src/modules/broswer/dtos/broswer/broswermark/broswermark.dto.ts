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

import { IsIntString } from "cc.naily.element.validator";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsInt, IsArray, ValidateNested } from "class-validator";

export class PostBrowserMarkQueryDTO {
  /**
   * 每页数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof PostBrowserMarkQueryDTO
   */
  @IsIntString()
  @IsOptional()
  take: number;

  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof PostBrowserMarkQueryDTO
   */
  @IsIntString()
  @IsOptional()
  skip: number;
}

export class PostBrowserMarkBodyDTO {
  /**
   * 列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/29
   * @type {PostBrowserMarkBodyListDTO[]}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  list: PostBrowserMarkBodyListDTO[];
}

export class PostBrowserMarkBodyListDTO {
  /**
   * 标题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * 图标
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  icon: string;
  /**
   * 颜色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  color: string;
  /**
   * 链接
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  link: string;
  /**
   * 索引
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  index: number;
}
