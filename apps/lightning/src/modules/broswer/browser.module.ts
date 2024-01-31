/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Module } from "@nestjs/common";
import { BrowserTrackController } from "./track.controller";
import { BrowserBookMarkRepository, BrowserTrackRepository, UserRepository } from "cc.naily.element.database";
import { NailyContext } from "cc.naily.element.shared";
import { BrowserMarkController } from "./mark.controller";
import { BrowserMarkService } from "./ mark.service";

@Module({
  controllers: [BrowserTrackController, BrowserMarkController],
  providers: [BrowserMarkService, BrowserTrackRepository, BrowserBookMarkRepository, UserRepository],
})
export class browserTrackModule extends NailyContext {}
