import { IsIntString } from "cc.naily.element.validator";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetBrowserTrackListQueryDTO {
  /**
   * 每页数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof GetBrowserTrackListQueryDTO
   */
  @IsOptional()
  @IsIntString()
  take?: number = 10;

  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof GetBrowserTrackListQueryDTO
   */
  @IsOptional()
  @IsIntString()
  skip?: number = 0;
}

export class PostBrowserTrackBodyDTO {
  @IsOptional()
  updatedAt?: Date;

  @IsString()
  @IsNotEmpty()
  webPageTitle: string;

  @IsString()
  @IsNotEmpty()
  webPageLink: string;
}