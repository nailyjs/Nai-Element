import { IsNotEmpty, IsString } from "class-validator";

export class GetSubscribeAppleCheckBodyDTO {
  /**
   * 苹果应用的bundleId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  bundleId: string;
  /**
   * 苹果应用的transactionId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}
