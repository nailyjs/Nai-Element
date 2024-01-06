/*
 * Copyright (c) 2023. Zero
 * email: gczgroup@qq.com
 * All rights reserved. This code is private and may not be used, copied,
 * or modified without prior authorization.
 */

import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonThrottlerModule {
  public static forRoot() {
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
