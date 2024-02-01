import { IsBoolean, IsNotEmpty } from "class-validator";

export class PutUserControlBodyDTO {
  /**
   * 是否公开
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {boolean}
   * @memberof PutUserControlBodyDTO
   */
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
