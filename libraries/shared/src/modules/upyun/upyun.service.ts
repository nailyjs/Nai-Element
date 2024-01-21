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

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { File } from "buffer";
import { join } from "path";
import { Stream } from "stream";
import { Client, Service, listDirOptions, listDirResponse, putFileOptions, putFilePictureResponse } from "upyun";

@Injectable()
export class UpyunService extends Client {
  public readonly baseDir: string = "";

  constructor(
    service: Service,
    private readonly configService: ConfigService,
  ) {
    super(service);
    this.baseDir = this.configService.get<string>("global.datasource.upyun.baseDir") || "";
  }

  listDir(remotePath: string, options?: listDirOptions): Promise<false | listDirResponse> {
    return super.listDir(join(this.baseDir, remotePath), options);
  }

  deleteFile(remotePath: string): Promise<boolean> {
    return super.deleteFile(join(this.baseDir, remotePath));
  }

  putFile(remotePath: string, localFile: string | Stream | Buffer | File, options?: putFileOptions): Promise<boolean | putFilePictureResponse> {
    return super.putFile(join(this.baseDir, remotePath), localFile, options);
  }
}
