/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
