import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetFileQueryDTO {
  /**
   * 文件路径
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof GetFileQueryDTO
   */
  @IsString()
  @IsNotEmpty()
  path: string;
  /**
   * 下一页
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof GetFileQueryDTO
   */
  @IsOptional()
  @IsString()
  next?: string;
}
