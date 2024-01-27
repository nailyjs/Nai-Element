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

import { ClientRepository } from "@nailyjs.nest.modules/tencentcloud";
import { Body, Controller, Inject, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { sms } from "tencentcloud-sdk-nodejs";
import { PostTransportSmsBodyDTO } from "../dtos/transport/sms/sms.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { ConfigService } from "@nestjs/config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { PhoneService } from "../../../providers/phone.service";

@ApiTags("传输")
@Controller("transport/sms")
export class TencentSmsController {
  @Inject(sms.v20210111.Client)
  private readonly smsClient: ClientRepository<typeof sms.v20210111.Client>;
  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;
  @Inject()
  private readonly configService: ConfigService;
  @Inject()
  private readonly phoneService: PhoneService;

  /**
   * 发送短信
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/26
   * @param {PostTransportSmsBodyDTO} body
   * @memberof TencentSmsController
   */
  @Post()
  @UseInterceptors(ResInterceptor)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  public send(@Body() body: PostTransportSmsBodyDTO) {
    return this.phoneService.saveCode(body.phone);
  }
}
