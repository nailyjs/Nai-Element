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

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import Shared, { CommonScheduleModule, ThrottlerBehindProxyGuard } from "cc.naily.element.shared";
import { CommonValidationPipe } from "cc.naily.element.validator";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { ProductModule } from "./modules/product/product.module";
import { CommonTypeOrmModule } from "cc.naily.element.database";
import { CommonJwtModule } from "cc.naily.element.auth";
import { SubscribeModule } from "./modules/subscribe/subscribe.module";

@Module({
  imports: [
    Shared.CommonConfigModule.forRoot(),
    Shared.CommonI18nModule.forRoot(),
    Shared.CommonThrottlerModule.forRoot(),
    Shared.CommonMailerModule.forRoot(),
    Shared.CommonErrorModule.forRoot(),
    Shared.CommonCacheModule.forRoot(),
    Shared.CommonDevModule.forRoot(),
    Shared.CommonLoggerModule.forRoot(),
    Shared.CommonUpyunModule.forRoot(),
    CommonTypeOrmModule.forRoot(),
    CommonJwtModule.forRoot(),
    CommonScheduleModule.forRoot(),
    ProductModule.register(),
    SubscribeModule.register(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_PIPE,
      useClass: CommonValidationPipe,
    },
  ],
})
export class AppModule {}
