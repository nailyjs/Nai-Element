import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { IsIntStringOrIntStringArray } from "cc.naily.element.validator";

export class GetProductDTO {
  /**
   * 排序方式
   *
   * @default latest
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @type {"latest"}
   * @memberof GetProductDTO
   */
  @ApiPropertyOptional({ enum: ["latest", "oldtest"] })
  @IsIn(["latest", "oldtest"])
  @IsOptional()
  orderTime?: "latest" | "oldtest";

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
  filterTags?: number[];
}
