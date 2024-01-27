import { IsNotEmpty, IsString } from "class-validator";

export class PutUserUsernameBodyDTO {
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PutUserUsernameBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  username: string;
}
