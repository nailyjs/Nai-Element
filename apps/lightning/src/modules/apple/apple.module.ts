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
import { AppleController } from "./apple.controller";
import { AppleService } from "./apple.service";
import { NailyContext } from "cc.naily.element.shared";
import { UserAppStoreSubscribeRepository } from "cc.naily.element.database";

@Module({
  controllers: [AppleController],
  providers: [AppleService, UserAppStoreSubscribeRepository],
})
export class AppleModule extends NailyContext {}
