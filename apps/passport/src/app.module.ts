import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonConfigModule, CommonI18nModule } from "cn.watchrss.element.shared";

@Module({
  imports: [CommonConfigModule.forRoot(), CommonI18nModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
