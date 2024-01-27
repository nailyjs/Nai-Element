import { Module } from "@nestjs/common";
import { BrowserTrackController } from "./browser.controller";
import { BrowserTrackRepository } from "cc.naily.element.database";
import { NailyContext } from "cc.naily.element.shared";

@Module({
  controllers: [BrowserTrackController],
  providers: [BrowserTrackRepository],
})
export class browserTrackModule extends NailyContext {}
