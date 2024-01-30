import { IsNotEmpty, IsString } from "class-validator";

export class GetSubscribeAppleUserStatusDTO {
  /**
   * 苹果transactionId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/25
   * @type {string}
   * @memberof GetSubscribeAppleUserStatusDTO
   */
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}
