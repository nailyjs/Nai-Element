import { User } from "cc.naily.element.database";

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
}
