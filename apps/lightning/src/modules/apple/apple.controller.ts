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

import { Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { CommonLogger, ResInterceptor } from "cc.naily.element.shared";
import { GetSubscribeAppleUserStatusDTO } from "./dtos/user/status/status.dto";
import { AppleService } from "./apple.service";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.element.generated";
import { GetSubscribeAppleCheckBodyDTO } from "./dtos/check/check.dto";

@ApiTags("苹果订阅")
@Controller("subscribe/apple")
export class AppleController {
  constructor(
    private readonly appleService: AppleService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly commonLogger: CommonLogger,
  ) {}

  /**
   * 获取苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/29
   * @param {UserEntity} user
   * @return {Promise<unknown>}
   * @memberof AppleController
   */
  @Auth()
  @Get("user")
  @UseInterceptors(ResInterceptor)
  public getUserStatus(@User() user: UserEntity): Promise<unknown> {
    return this.appleService.getAllSubscriptionStatuses(user.userID);
  }

  /**
   * 检查苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {*} body
   * @return {Promise<unknown>}
   * @memberof AppleController
   */
  @Post("check")
  @UseInterceptors(ResInterceptor)
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
          code: 1046,
          message: this.i18n.t("global.errorCode.1046"),
          data,
        };
      }
    } catch (error) {
      this.commonLogger.error("苹果订阅检查失败！！！");
      console.error(error);
      if (error && error.apiError && error.apiError === 4040010) {
        return {
          code: 1053,
          message: this.i18n.t("global.errorCode.1053"),
          data: error,
        };
      }
      return {
        code: 1045,
        message: this.i18n.t("global.errorCode.1045"),
        data: error,
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
