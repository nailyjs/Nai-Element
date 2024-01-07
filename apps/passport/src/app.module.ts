import Shared, { ThrottlerBehindProxyGuard } from "cn.watchrss.element.shared";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonJwtModule } from "cn.watchrss.element.auth";
import { CommonTypeOrmModule } from "cn.watchrss.element.database";
import { LoginModule } from "./modules/login/login.module";
import { RegisterModule } from "./modules/register/register.module";
import { TransportModule } from "./modules/transport/transport.module";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    Shared.CommonConfigModule.forRoot(),
    Shared.CommonI18nModule.forRoot(),
    Shared.CommonThrottlerModule.forRoot(),
    Shared.CommonMailerModule.forRoot(),
    Shared.CommonErrorModule.forRoot(),
    Shared.CommonCacheModule.forRoot(),
    Shared.CommonDevModule.forRoot(),
    CommonJwtModule.forRoot(),
    CommonTypeOrmModule.forRoot(),
    LoginModule,
    RegisterModule,
    TransportModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
