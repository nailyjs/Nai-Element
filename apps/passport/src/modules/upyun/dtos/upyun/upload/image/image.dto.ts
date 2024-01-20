import { ApiProperty } from "@nestjs/swagger";

export class PostFileUploadImageDTO {
  /**
   * 多张图片
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {any[]}
   * @memberof PostFileUploadImageDTO
   */
  @ApiProperty({ type: "string", format: "binary" })
  file: any;
}
