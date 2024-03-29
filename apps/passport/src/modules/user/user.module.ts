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
import { UserController } from "./controllers/user.controller";
import { NailyContext } from "cc.naily.element.shared";
import { UserService } from "./providers/user.service";
import { UserControlRepository, UserDataRepository, UserRepository } from "cc.naily.element.database";
import { UserDataController } from "./controllers/data.controller";
import { UserDataService } from "./providers/data.service";
import { TransportModule } from "../transport/transport.module";
import { UserControlController } from "./controllers/control.controller";
import { UserControlService } from "./providers/control.service";

/**
 * 用户模块
 *
 * @class
 * @public
 * @since 2024
 * @author Zero <gczgroup@qq.com>
 */
@Module({
  imports: [TransportModule],
  controllers: [UserController, UserDataController, UserControlController],
  providers: [UserService, UserDataService, UserControlService, UserRepository, UserControlRepository, UserDataRepository],
})
export class UserModule extends NailyContext {}
