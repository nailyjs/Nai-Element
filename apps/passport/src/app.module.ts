import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonConfigModule, CommonI18nModule, CommonThrottlerModule, CommonMailerModule } from "cn.watchrss.element.shared";
import { CommonJwtModule } from "cn.watchrss.element.auth";
import { CommonTypeOrmModule } from "cn.watchrss.element.database";

@Module({
  imports: [
    CommonConfigModule.forRoot(),
    CommonI18nModule.forRoot(),
    CommonThrottlerModule.forRoot(),
    CommonMailerModule.forRoot(),
    CommonJwtModule.forRoot(),
    CommonTypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
