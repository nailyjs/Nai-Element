import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class PutUserAvatarBodyDTO {
  /**
   * 头像地址
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @type {string}
   * @memberof PutUserAvatarBodyDTO
   */
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
