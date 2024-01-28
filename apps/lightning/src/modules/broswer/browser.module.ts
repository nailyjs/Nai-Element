import { Module } from "@nestjs/common";
import { BrowserTrackController } from "./track.controller";
import { BrowserBookMarkRepository, BrowserTrackRepository } from "cc.naily.element.database";
import { NailyContext } from "cc.naily.element.shared";
import { BrowserMarkController } from "./mark.controller";

@Module({
  controllers: [BrowserTrackController, BrowserMarkController],
  providers: [BrowserTrackRepository, BrowserBookMarkRepository],
})
export class browserTrackModule extends NailyContext {}
