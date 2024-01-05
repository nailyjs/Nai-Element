import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonConfigModule, CommonI18nModule, CommonThrottlerModule, CommonMailerModule, CommonErrorModule } from "cn.watchrss.element.shared";
import { CommonJwtModule } from "cn.watchrss.element.auth";
import { CommonTypeOrmModule } from "cn.watchrss.element.database";
import { LoginModule } from "./modules/login/login.module";

@Module({
  imports: [
    CommonConfigModule.forRoot(),
    CommonI18nModule.forRoot(),
    CommonThrottlerModule.forRoot(),
    CommonMailerModule.forRoot(),
    CommonJwtModule.forRoot(),
    CommonTypeOrmModule.forRoot(),
    CommonErrorModule.forRoot(),
    LoginModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
