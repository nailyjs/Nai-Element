import { Module } from "@nestjs/common";
import { AppleController } from "./apple.controller";
import { AppleService } from "./apple.service";
import { NailyContext } from "cc.naily.element.shared";
import { UserAppStoreSubscribeRepository } from "cc.naily.element.database";

@Module({
  controllers: [AppleController],
  providers: [AppleService, UserAppStoreSubscribeRepository],
})
export class AppleModule extends NailyContext {}
