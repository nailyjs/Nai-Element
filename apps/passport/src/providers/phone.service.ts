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
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { sms } from "tencentcloud-sdk-nodejs";

@Injectable()
export class PhoneService {
  constructor(
    @Inject(sms.v20210111.Client)
    private readonly smsClient: ClientRepository<typeof sms.v20210111.Client>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  private getCode() {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  }

  private getRedisKey(phone: string) {
    return `passport:phone:${phone}`;
  }

  public async saveCode(phone: string) {
    const key = this.getRedisKey(phone);
    const code = this.getCode();
    await this.cacheManager.store.set(key, code, 1000 * 60 * 5);
    return this.smsClient.SendSms({
      SmsSdkAppId: this.configService.get("global.tencent.cloud.sms.SmsSdkAppId"),
      SignName: this.configService.get("global.tencent.cloud.sms.SignName"),
      PhoneNumberSet: [`${phone}`],
      TemplateId: this.configService.get("global.tencent.cloud.sms.TemplateId"),
      TemplateParamSet: [`${code}`, "5"],
    });
  }

  public async checkCode(phone: string, code: number) {
    const key = this.getRedisKey(phone);
    const redisCode = (await this.cacheManager.store.get(key)) || "";
    if (redisCode.toString() !== code.toString()) {
      throw new BadRequestException(1040);
    }
  }
}
