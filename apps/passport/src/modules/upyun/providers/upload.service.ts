import { BadRequestException, Injectable } from "@nestjs/common";
import { CommonLogger, UpyunService } from "cc.naily.element.shared";
import { User } from "cc.naily.element.database";
import { join } from "path";
import { UploadServiceListFileResDTO, UploadServiceListFileWrapperUpyunExtraDataResDTO } from "../dtos/upyun/file.res.dto";
import { UploadService } from "../../../interfaces/file.interface";

@Injectable()
export class UpyunUploadService implements UploadService {
  constructor(
    private readonly upyunService: UpyunService,
    private readonly commonLogger: CommonLogger,
  ) {
    commonLogger.setContext(UpyunUploadService.name);
  }

  public async listFiles(
    path: string,
    next: string,
    user: Omit<User, "password">,
  ): Promise<[UploadServiceListFileResDTO[], UploadServiceListFileWrapperUpyunExtraDataResDTO]> {
    const list = await this.upyunService.listDir(join(user.userID.toString(), path), {
      iter: next,
    });
    if (!list) return [[], null];
    return [
      list.files.map((item) => {
        return {
          type: item.type === "F" ? "folder" : "file",
          name: item.name,
        };
      }),
      { next: list.next, path },
    ];
  }

  public async uploadImage(file: Express.Multer.File, user: Omit<User, "password">) {
    const filePath = join(user.userID.toString(), "images", `${new Date().getTime()}-${file.originalname}`);
    const res = await this.upyunService.putFile(filePath, file.buffer);
    if (res === true) {
      const deleteFile = async () => {
        try {
          const isSuccess = this.upyunService.deleteFile(filePath);
          if (!isSuccess) deleteFile();
          this.commonLogger.log(`删除文件：${filePath}`);
        } catch (error) {
          console.log(error);
          this.commonLogger.error(`删除文件失败：${filePath} 将会继续尝试删除`);
          deleteFile();
        }
      };
      setTimeout(deleteFile, 2000);
      throw new BadRequestException(1028);
    } else if (res === false) {
      throw new BadRequestException(1029);
    }

    return res;
  }
}
