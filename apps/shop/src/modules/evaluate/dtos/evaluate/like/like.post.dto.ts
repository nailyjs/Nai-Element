import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class PostCreateEvaluateLikeBodyDTO {
  /**
   * 商品评论ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof PostCreateEvaluateLikeBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  evaluateID: number;
}
