import { Module } from "@nestjs/common";
import { BrowserTrackController } from "./track.controller";
import { BrowserBookMarkRepository, BrowserTrackRepository, UserRepository } from "cc.naily.element.database";
import { NailyContext } from "cc.naily.element.shared";
import { BrowserMarkController } from "./mark.controller";

@Module({
  controllers: [BrowserTrackController, BrowserMarkController],
  providers: [BrowserTrackRepository, BrowserBookMarkRepository, UserRepository],
})
export class browserTrackModule extends NailyContext {}
