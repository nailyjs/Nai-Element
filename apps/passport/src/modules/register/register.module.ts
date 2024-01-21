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
import { RegisterController } from "./controllers/register.controller";
import { EmailService } from "../../providers/email.service";
import { UserRepository } from "cc.naily.element.database";
import { BusinessModule } from "cc.naily.element.shared";
import { RegisterService } from "./providers/register.service";

@Module({
  controllers: [RegisterController],
  providers: [EmailService, RegisterService, UserRepository],
})
export class RegisterModule extends BusinessModule {}
