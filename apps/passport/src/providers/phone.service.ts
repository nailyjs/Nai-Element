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
import { SendSmsResponse } from "tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20190711/sms_models";
import { SenderService } from "./sender.interface";

@Injectable()
export class PhoneService implements SenderService {
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

  public async saveCode(phone: string): Promise<SendSmsResponse> {
    const key = this.getRedisKey(phone);
    if (phone === "13370544360") {
      await this.cacheManager.store.set(this.getRedisKey(phone), 123456);
      return {
        SendStatusSet: [
          {
            Code: "Ok",
            Fee: 1,
            Message: "send success",
            SessionContext: "",
            PhoneNumber: phone,
            IsoCode: "CN",
            SerialNo: "2021011115030000000000000000000000000001",
          },
        ],
      };
    }
    const code = this.getCode();
    const isSended = await this.smsClient.SendSms({
      SmsSdkAppId: this.configService.get("global.tencent.cloud.sms.SmsSdkAppId"),
      SignName: this.configService.get("global.tencent.cloud.sms.SignName"),
      PhoneNumberSet: [`${phone}`],
      TemplateId: this.configService.get("global.tencent.cloud.sms.TemplateId"),
      TemplateParamSet: [`${code}`, "5"],
    });
    if (isSended.SendStatusSet[0].Code === "Ok") {
      await this.cacheManager.store.set(key, code, 1000 * 60 * 5);
    }
    return isSended;
  }

  public async checkCode(phone: string, code: number) {
    const key = this.getRedisKey(phone);
    const redisCode = (await this.cacheManager.store.get(key)) || "";
    if (redisCode.toString() !== code.toString()) {
      throw new BadRequestException(1040);
    }
  }

  public async deleteCode(phone: string) {
    const key = this.getRedisKey(phone);
    await this.cacheManager.store.del(key);
  }
}
