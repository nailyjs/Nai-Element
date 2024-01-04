import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonConfigModule, CommonI18nModule, CommonThrottlerModule, CommonMailerModule } from "cn.watchrss.element.shared";

@Module({
  imports: [CommonConfigModule.forRoot(), CommonI18nModule.forRoot(), CommonThrottlerModule.forRoot(), CommonMailerModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
