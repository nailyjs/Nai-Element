import helmet from "helmet";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AppController } from "./app.controller";
import { CommonJwtModule } from "cc.naily.element.auth";
import { CommonTypeOrmModule } from "cc.naily.element.database";
import { LoginModule } from "./modules/login/login.module";
import { RegisterModule } from "./modules/register/register.module";
import { TransportModule } from "./modules/transport/transport.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import Shared, { ThrottlerBehindProxyGuard } from "cc.naily.element.shared";
import { UserModule } from "./modules/user/user.module";
import { PayModule } from "./modules/pay/pay.module";
import { CommonValidationPipe } from "cc.naily.element.validator";
import { UpyunFileModule } from "./modules/upyun/upyun.module";

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
    consumer.apply(helmet()).forRoutes("*");
  }
}
