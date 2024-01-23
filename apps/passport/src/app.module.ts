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

import helmet from "helmet";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AppController } from "./app.controller";
import { CommonJwtModule } from "cc.naily.element.auth";
import { CommonTypeOrmModule } from "cc.naily.element.database";
import { LoginModule } from "./modules/login/login.module";
import { RegisterModule } from "./modules/register/register.module";
import { TransportModule } from "./modules/transport/transport.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import Shared, { LoggerMiddleware, ThrottlerBehindProxyGuard } from "cc.naily.element.shared";
import { UserModule } from "./modules/user/user.module";
import { PayModule } from "./modules/pay/pay.module";
import { CommonValidationPipe } from "cc.naily.element.validator";
import { UpyunFileModule } from "./modules/upyun/upyun.module";
import { GoogleModule } from "./modules/google/google.module";

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
    CommonJwtModule.forRoot(),
    CommonTypeOrmModule.forRoot(),
    LoginModule.register(),
    RegisterModule.register(),
    TransportModule.register(),
    GoogleModule.register(),
    UserModule.register(),
    PayModule.register(),
    UpyunFileModule.register(),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*").apply(helmet()).forRoutes("*");
  }
}
