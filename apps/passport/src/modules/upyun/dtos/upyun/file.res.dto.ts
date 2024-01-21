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
