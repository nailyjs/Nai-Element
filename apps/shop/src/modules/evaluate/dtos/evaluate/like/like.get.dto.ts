import { ApiProperty } from "@nestjs/swagger";
import { IsIntString } from "cc.naily.element.validator";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  @IsIntString()
  @IsNotEmpty()
  userID: number;
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
