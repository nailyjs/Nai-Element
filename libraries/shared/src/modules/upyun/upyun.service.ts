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
