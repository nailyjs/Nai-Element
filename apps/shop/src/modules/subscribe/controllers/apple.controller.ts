import { Body, Controller, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { GetSubscribeAppleUserStatusDTO } from "../dtos/subscribe/apple/user/status/status.dto";
import { AppleService } from "../providers/apple.service";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.element.generated";
import { GetSubscribeAppleCheckBodyDTO } from "../dtos/subscribe/apple/check/check.dto";

@ApiTags("苹果订阅")
@Controller("subscribe/apple")
export class AppleController {
  constructor(
    private readonly appleService: AppleService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  /**
   * 检查苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {*} body
   * @return {*}  {Promise<unknown>}
   * @memberof AppleController
   */
  @Post("check")
  @UseInterceptors(ResInterceptor)
  @ApiOperation({ summary: "检查苹果订阅状态" })
  @ApiBody({ type: GetSubscribeAppleCheckBodyDTO })
  public async checkPay(@Body() body: GetSubscribeAppleCheckBodyDTO): Promise<unknown> {
    try {
      const data = await this.appleService.checkTransactionID(body.bundleId, body.transactionId);
      if (data.data.length === 0) {
        return {
          code: 1044,
          message: this.i18n.t("global.errorCode.1044"),
          data,
        };
      } else {
        return {
          code: 1045,
          message: this.i18n.t("global.errorCode.1046"),
          data,
        };
      }
    } catch (error) {
      return {
        code: 1045,
        message: this.i18n.t("global.errorCode.1045"),
        data: JSON.stringify(error),
      };
    }
  }

  /**
   * 链接TransactionID到苹果订阅
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/25
   * @memberof AppleController
   */
  @Auth()
  @Post("user/link")
  @UseInterceptors(ResInterceptor)
  public linkTransactionID(@User() user: UserEntity, @Query() { transactionId }: GetSubscribeAppleUserStatusDTO): Promise<unknown> {
    return this.appleService.linkTransactionID(user, transactionId);
  }
}
