import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import Shared, { ThrottlerBehindProxyGuard } from "cc.naily.element.shared";
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
