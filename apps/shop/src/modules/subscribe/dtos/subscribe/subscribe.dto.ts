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
import { IsIntString, IsNumberOrNumberArray } from "cc.naily.element.validator";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class GetSubscribeListQueryDTO {
  /**
   * 时间排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/22
   * @type {("latest" | "oldest")}
   * @memberof GetSubscribeListQueryDTO
   */
  @ApiProperty({ description: "时间排序方式", enum: ["latest", "oldest"] })
  @IsOptional()
  @IsIn(["latest", "oldest"])
  @IsString()
  orderTime?: "latest" | "oldest";
  /**
   * 价格排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/22
   * @type {("highest" | "lowest")}
   * @memberof GetSubscribeListQueryDTO
   */
  @ApiProperty({ description: "价格排序方式", enum: ["highest", "lowest"] })
  @IsOptional()
  @IsIn(["highest", "lowest"])
  @IsString()
  orderPrice?: "highest" | "lowest";
  /**
   * 过滤用户
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number[]}
   * @memberof GetSubscribeListQueryDTO
   */
  @IsOptional()
  @IsNumberOrNumberArray()
  @ApiProperty({ description: "过滤用户", isArray: true, type: "string", format: "uuid" })
  filterUser?: string | string[];
  /**
   * 获取数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/22
   * @type {number}
   * @memberof GetSubscribeListQueryDTO
   */
  @IsIntString()
  @IsOptional()
  take?: number;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/22
   * @type {number}
   * @memberof GetSubscribeListQueryDTO
   */
  @IsIntString()
  @IsOptional()
  skip?: number;
}

export class PostSubscribeBodyDTO {
  /**
   * 商品标题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostSubscribeBodyDTO
   */
  title: string;
  /**
   * 商品介绍
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostSubscribeBodyDTO
   */
  introduction: string;
  /**
   * 商品时长（天）
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostSubscribeBodyDTO
   */
  duration: number;
  /**
   * 商品价格（元）
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostSubscribeBodyDTO
   */
  price: number;
}

export class PutSubscribeBodyDTO {
  /**
   * 订阅制商品ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PutSubscribeBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  subscribeID: string;
}

export class getSubscribeUserStatusQueryDTO {
  /**
   * 订阅制商品ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/21
   * @type {number}
   * @memberof getSubscribeUserStatusQueryDTO
   */
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  subscribeID: string;
}
