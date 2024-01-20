import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { PostFileUploadImageDTO } from "../dtos/file/upload/image/image.dto";
import { UpyunUploadService } from "../providers/upload.service";
import { User as UserEntity } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("文件")
@Controller("file")
export class FileController {
  constructor(private readonly upyunUploadService: UpyunUploadService) {}

  /**
   * 上传图片
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {Express.Multer.File[]} file
   * @memberof FileController
   */
  @Auth()
  @Post("upload/image")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"), ResInterceptor)
  @ApiBody({ type: PostFileUploadImageDTO })
  uploadImage(@UploadedFile() file: Express.Multer.File, @User() user: Omit<UserEntity, "password">) {
    return this.upyunUploadService.uploadImage(file, user);
  }
}
