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
import { IsIntString } from "cc.naily.element.validator";
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class GetEvaluateLikeQueryDTO {
  /**
   * 时间排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {("latest" | "oldest")}
   * @memberof GetEvaluateLikeQueryDTO
   */
  @ApiProperty({ enum: ["latest", "oldest"] })
  @IsIn(["latest", "oldest"])
  @IsOptional()
  @IsString()
  orderTime?: "latest" | "oldest";
  /**
   * 用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateLikeQueryDTO
   */
  @IsUUID()
  @IsNotEmpty()
  userID: string;
  /**
   * 获取数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateLikeQueryDTO
   */
  @IsOptional()
  @IsIntString()
  take?: number;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof GetEvaluateLikeQueryDTO
   */
  @IsOptional()
  @IsIntString()
  skip?: number;
}
