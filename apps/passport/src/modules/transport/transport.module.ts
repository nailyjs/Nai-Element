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
import { EmailService } from "../../providers/email.service";
import { EmailController } from "./controllers/email.controller";
import { UserRepository } from "cc.naily.element.database";
import { NailyContext } from "cc.naily.element.shared";
import { TencentSmsController } from "./controllers/tencent.sms.controller";
import { PhoneService } from "../../providers/phone.service";
import { QrCodeController } from "./controllers/qrcode.controller";
import { QrCodeService } from "../../providers/qrcode.service";

@Module({
  controllers: [EmailController, QrCodeController, TencentSmsController],
  providers: [EmailService, PhoneService, QrCodeService, UserRepository],
  exports: [EmailService],
})
export class TransportModule extends NailyContext {}
