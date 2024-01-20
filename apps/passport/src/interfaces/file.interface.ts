import { ApiProperty } from "@nestjs/swagger";
import { User } from "cc.naily.element.database";

export class ExtraDataDTO {
  path: string;
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
  @ApiProperty({ type: "string", description: "文件名" })
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

export interface UploadService {
  /**
   * 上传图片
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {Express.Multer.File} file
   * @param {Omit<User, "password">} user
   * @return {*}  {Promise<any>}
   * @memberof UploadService
   */
  uploadImage(file: Express.Multer.File, user: Omit<User, "password">): Promise<any>;
  /**
   * 获取文件列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @return {Promise<[UploadService.UploadServiceListFileDTO[], any]>} any 为附带信息
   * @memberof UploadService
   */
  listFiles(...args: any[]): Promise<[UploadServiceListFileResDTO[], ExtraDataDTO]>;
}
