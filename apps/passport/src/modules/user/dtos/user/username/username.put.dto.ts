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

export class PutUserSayingBodyDTO {
  /**
   * 个性签名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {string}
   * @memberof PutUserSayingBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  saying: string;
}
