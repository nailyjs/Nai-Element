import { ApiProperty } from "@nestjs/swagger";
import { ExtraDataDTO } from "../../../../interfaces/file.interface";

export class UploadServiceListFileWrapperResponseResDTO {
  statusCode: number = 200;
  code: number = 1000;
  message: string = "成功";
  data: UploadServiceListFileWrapperResDTO;
}

export class UploadServiceListFileWrapperUpyunExtraDataResDTO extends ExtraDataDTO {
  next: string;
  path: string;
}

export class UploadServiceListFileWrapperResDTO {
  list: UploadServiceListFileResDTO[];
  extraData: UploadServiceListFileWrapperUpyunExtraDataResDTO;
}

export class UploadServiceListFileResDTO {
  /**
   * 文件名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof UploadServiceListFileDTO
   */
  name: string;
  /**
   * 文件夹还是文件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {("file" | "folder")}
   * @memberof UploadServiceListFileDTO
   */
  @ApiProperty({ type: "string", enum: ["file", "folder"] })
  type: "file" | "folder";
}
