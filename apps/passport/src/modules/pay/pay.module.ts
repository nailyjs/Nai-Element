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

import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import { NailyContext } from "cc.naily.element.shared";
import { XunhupayController } from "./controllers/xunhupay.controller";
import { XunhupayService } from "./providers/xunhupay.service";
import { HttpModule } from "@nestjs/axios";
import { PayService } from "./providers/pay.service";
import { UserOrderRepository } from "cc.naily.element.database";
import { WeChatPayModule } from "nest-wechatpay-node-v3";
import { ConfigService } from "@nestjs/config";
import { readFileSync } from "fs";
import { join } from "path";
import { WechatService } from "./providers/wechat.service";
import { WechatController } from "./controllers/wechat.controller";

@Module({})
export class PayModule extends NailyContext {
  private static configuration = PayModule.ymlConfigCache || {};
  private static isEnableWechat =
    PayModule.configuration.global.pay &&
    PayModule.configuration.global.pay.enabled &&
    Array.isArray(PayModule.configuration.global.pay.enabled) &&
    (PayModule.configuration.global.pay.enabled as any[]).includes("wechat");
  private static isEnableXunhupay =
    PayModule.configuration.global.pay &&
    PayModule.configuration.global.pay.enabled &&
    Array.isArray(PayModule.configuration.global.pay.enabled) &&
    ((PayModule.configuration.global.pay.enabled as any[]).includes("xunhupayWechat") ||
      (PayModule.configuration.global.pay.enabled as any[]).includes("xunhupayAlipay"));

  public static register(): DynamicModule {
    return {
      module: PayModule,
      imports: (() => {
        const imports = [
          HttpModule.register({
            timeout: 5000,
            method: "POST",
          }),
        ];

        if (this.isEnableWechat) {
          imports.push(
            WeChatPayModule.registerAsync({
              inject: [ConfigService],
              async useFactory(configService: ConfigService) {
                const wechatConfig = configService.get("global.pay.wechat") || {};
                const enabled: string[] = configService.get("global.pay.enabled") || [];
                if (typeof wechatConfig !== "object") throw new TypeError("YAMCONFIG ERROR: global.pay.wechat config must be an object");
                if (enabled.includes("wechat") && (!wechatConfig.appid || !wechatConfig.mchid || !wechatConfig.notify_url || !wechatConfig.name)) {
                  throw new Error("YAMCONFIG ERROR: global.pay.wechat config must have `appid` and `mchid` and `notify_url` and `name`");
                }

                return {
                  appid: wechatConfig.appid ? wechatConfig.appid : "",
                  mchid: wechatConfig.mchid ? wechatConfig.mchid : "",
                  key: wechatConfig.key ? wechatConfig.key : "",
                  serial_no: wechatConfig.serial_no ? wechatConfig.serial_no : "",
                  publicKey: readFileSync(join(process.env.PUBLIC_ROOT, process.env.NODE_ENV ? process.env.NODE_ENV : "", "wechat_public.pem")),
                  privateKey: readFileSync(join(process.env.PUBLIC_ROOT, process.env.NODE_ENV ? process.env.NODE_ENV : "", "wechat_private.pem")),
                };
              },
            }),
          );
        }

        return imports;
      })(),
      controllers: (() => {
        const controllers: Type[] = [];
        if (this.isEnableWechat) controllers.push(WechatController);
        if (this.isEnableXunhupay) controllers.push(XunhupayController);
        return controllers;
      })(),
      providers: (() => {
        const providers: Provider[] = [PayService, UserOrderRepository];
        if (this.isEnableWechat) providers.push(WechatService);
        if (this.isEnableXunhupay) providers.push(XunhupayService);
        return providers;
      })(),
    };
  }
}
