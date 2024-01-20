import { BadRequestException, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { PostFileUploadImageDTO } from "../dtos/upyun/upload/image/image.dto";
import { UpyunUploadService } from "../providers/upload.service";
import { User as UserEntity } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { GetFileQueryDTO } from "../dtos/upyun/file.dto";
import { UploadServiceListFileWrapperResponseResDTO } from "../dtos/upyun/file.res.dto";

@Auth()
@ApiTags("又拍文件")
@Controller("upyun")
export class UpyunController {
  constructor(private readonly upyunUploadService: UpyunUploadService) {}
  /**
   * 获取文件列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @memberof FileController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  @ApiOkResponse({ type: UploadServiceListFileWrapperResponseResDTO })
  @ApiOperation({
    summary: "获取文件列表",
    description:
      "和其他的分页不同,限制一次最多列出100条数据。如果要拿到100条之后的数据,将分页的`next`参数传入，则会拿到下一页；同时又会有下下一页的分页`next`；以此类推，就能拿到列表的所有数据了",
  })
  public async listFiles(@Query() { path, next }: GetFileQueryDTO, @User() user: Omit<UserEntity, "password">) {
    try {
      const [list, extraData] = await this.upyunUploadService.listFiles(path, next, user);
      return { list, extraData };
    } catch (error) {
      throw new BadRequestException(error.code);
    }
  }
  /**
   * 上传图片
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {Express.Multer.File[]} file
   * @memberof FileController
   */
  @Post("upload/image")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: PostFileUploadImageDTO })
  @UseInterceptors(FileInterceptor("file"), ResInterceptor)
  @ApiOperation({ summary: "上传图片", description: "每次只能上传1张`图片` 使用`multipart/form-data`上传 只能上传图片 上传其他文件类型会被拒绝" })
  uploadImage(@UploadedFile() file: Express.Multer.File, @User() user: Omit<UserEntity, "password">) {
    return this.upyunUploadService.uploadImage(file, user);
  }
}
