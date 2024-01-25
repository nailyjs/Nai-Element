import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { GetSubscribeAppleUserStatusDTO } from "../dtos/subscribe/apple/user/status/status.dto";
import { AppleService } from "../providers/apple.service";

@ApiTags("苹果订阅")
@Controller("subscribe/apple")
export class AppleController {
  constructor(private readonly appleService: AppleService) {}

  /**
   * 获取用户 苹果 订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/25
   * @memberof AppleController
   */
  @Auth()
  @Get("user/status")
  @UseInterceptors(ResInterceptor)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getUserStatus(@User() user: UserEntity, @Query() { transactionId }: GetSubscribeAppleUserStatusDTO) {}
}
