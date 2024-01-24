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

import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsIntString, IsNotEmpty, IsNumber, IsOptional, IsString } from "cc.naily.element.validator";

export class GetEvaluateQueryDTO {
  /**
   * 商品ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateQueryDTO
   */
  @IsIntString()
  @IsNotEmpty()
  productID: number;
  /**
   * 时间排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {("latest" | "oldest")}
   * @memberof GetEvaluateQueryDTO
   */
  @IsOptional()
  @IsIn(["latest", "oldest"])
  @IsString()
  @ApiPropertyOptional({ enum: ["latest", "oldest"] })
  orderTime?: "latest" | "oldest" = "latest";
  /**
   * 点赞排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {("most" | "least")}
   * @memberof GetEvaluateQueryDTO
   */
  @IsOptional()
  @IsIn(["most", "least"])
  @IsString()
  @ApiPropertyOptional({ enum: ["most", "least"] })
  orderLike?: "most" | "least" = "most";
  /**
   * 获取到的总数
   *
   * @default 10
   * @example 10
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateQueryDTO
   */
  @IsOptional()
  @IsIntString()
  take?: number;

  /**
   * 跳过的数量
   *
   * @default 0
   * @example 0
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateQueryDTO
   */
  @IsOptional()
  @IsIntString()
  skip?: number;
}

export class GetEvaluateChildrenQueryDTO {
  /**
   * 父评论ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateChildrenQueryDTO
   */
  @IsIntString()
  @IsNotEmpty()
  evaluateID: number;
  /**
   * 获取到的深度
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateChildrenQueryDTO
   */
  @IsIntString()
  depth?: number = 3;
  /**
   * 获取到的总数
   *
   * @default 10
   * @example 10
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateQueryDTO
   */
  @IsOptional()
  @IsIntString()
  take?: number;
  /**
   * 跳过的数量
   *
   * @default 0
   * @example 0
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateQueryDTO
   */
  @IsOptional()
  @IsIntString()
  skip?: number;
}

export class PostCreateEvaluateBodyDTO {
  /**
   * 商品ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof PostCreateEvaluateBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  productID: number;
  /**
   * 评论内容
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostCreateEvaluateBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class PostReplyEvaluateBodyDTO {
  /**
   * 评论内容
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostReplyEvaluateBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  content: string;
  /**
   * 父评论ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @example 1
   * @default 0
   * @type {number}
   * @memberof PostReplyEvaluateBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsOptional()
  evaluateID?: number = 0;
}
