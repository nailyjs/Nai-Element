import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IsIntArray, IsIntStringOrIntStringArray } from "cc.naily.element.validator";

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
   * 过滤标签
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @type {number[]}
   * @memberof GetProductDTO
   */
  @IsIntStringOrIntStringArray()
  @IsOptional()
  filterTags?: number[] = [];
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
  @IsIntArray()
  productTags: number[] = [];
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
