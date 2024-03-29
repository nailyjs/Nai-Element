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

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IntStringMin, IsIntString, IsIntStringOrIntStringArray, IsNumberOrNumberArray } from "cc.naily.element.validator";

export class GetProductDTO {
  /**
   * 时间排序
   *
   * @default latest
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @type {"latest"}
   * @memberof GetProductDTO
   */
  @ApiPropertyOptional({ enum: ["latest", "oldest"] })
  @IsIn(["latest", "oldest"])
  @IsOptional()
  orderTime?: "latest" | "oldest" = "latest";
  /**
   * 热度排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {("hottest" | "coldest")}
   * @memberof GetProductDTO
   */
  @ApiPropertyOptional({ enum: ["hottest", "coldest"] })
  @IsIn(["hottest", "coldest"])
  @IsOptional()
  orderHot?: "hottest" | "coldest" = "hottest";
  /**
   * 价格排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {("highest" | "lowest")}
   * @memberof GetProductDTO
   */
  @ApiPropertyOptional({ enum: ["highest", "lowest"] })
  @IsIn(["highest", "lowest"])
  @IsOptional()
  orderPrice?: "highest" | "lowest" = "highest";
  /**
   * 销量排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {("highest" | "lowest")}
   * @memberof GetProductDTO
   */
  @ApiPropertyOptional({ enum: ["highest", "lowest"] })
  @IsIn(["highest", "lowest"])
  @IsOptional()
  orderSold?: "highest" | "lowest" = "highest";
  /**
   * 库存排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {("highest" | "lowest")}
   * @memberof GetProductDTO
   */
  @ApiPropertyOptional({ enum: ["highest", "lowest"] })
  @IsIn(["highest", "lowest"])
  @IsOptional()
  orderStock?: "highest" | "lowest" = "highest";
  /**
   * 过滤标签
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @type {number[]}
   * @memberof GetProductDTO
   */
  @IsIntStringOrIntStringArray()
  @IsOptional()
  filterTags?: string[];
  /**
   * 过滤用户
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number[]}
   * @memberof GetProductDTO
   */
  @IsIntStringOrIntStringArray()
  @IsOptional()
  filterUser?: string[];
  /**
   * 取到数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof GetProductDTO
   */
  @IntStringMin(0)
  @IsIntString()
  @IsOptional()
  take?: number = 10;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof GetProductDTO
   */
  @IntStringMin(0)
  @IsIntString()
  @IsOptional()
  skip?: number = 0;
}

export class PostCreateProductDTO {
  /**
   * 商品名称
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostCreateProductDTO
   */
  @IsString()
  @IsNotEmpty()
  productName: string;
  /**
   * 商品描述
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostCreateProductDTO
   */
  @IsString()
  @IsNotEmpty()
  productIntroduction: string;
  /**
   * 商品金额 单位分
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostCreateProductDTO
   */
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;
  /**
   * 商品折扣价 单位分 可选（或者传入0）
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostCreateProductDTO
   */
  @IsOptional()
  @IsNumber()
  productDiscountPrice?: number = 0;
  /**
   * 库存数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostCreateProductDTO
   */
  @Min(0)
  @IsNumber()
  productStock: number = 0;
  /**
   * 商品标签
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number[]}
   * @memberof PostCreateProductDTO
   */
  @IsArray()
  productTags: string[];
  /**
   * 商品状态 立即上架请填true，暂不上架请填false
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {boolean}
   * @memberof PostCreateProductDTO
   */
  @IsBoolean()
  @IsNotEmpty()
  productStatus: boolean = true;
}

export class PostSearchProductDTO extends GetProductDTO {
  /**
   * 搜索关键字
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostSearchProductDTO
   */
  @IsString()
  @IsNotEmpty()
  keyword: string;
}

export class DeletedeleteProductDTO {
  /**
   * 商品id
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {(number | number[])}
   * @memberof DeletedeleteProductDTO
   */
  @ApiProperty({ anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] })
  @IsNumberOrNumberArray()
  productID: string | string[];
}
