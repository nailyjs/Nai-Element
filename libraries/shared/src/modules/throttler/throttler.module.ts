/*
 * Copyright (c) 2023. Zero
 * email: gczgroup@qq.com
 * All rights reserved. This code is private and may not be used, copied,
 * or modified without prior authorization.
 */

import { DynamicModule, Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonThrottlerModule {
  /**
   * 注册限流模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonThrottlerModule
   */
  public static forRoot(): DynamicModule {
    return ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return [
          {
            ttl: configService.get("global.throttler.ttl") ? configService.get("global.throttler.ttl") : 60000,
            limit: configService.get("global.throttler.limit") ? configService.get("global.throttler.limit") : 300,
          },
        ];
      },
    });
  }
}
