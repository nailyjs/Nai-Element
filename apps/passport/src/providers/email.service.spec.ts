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

import "jest";
import { beforeEach, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { UserRepository } from "cc.naily.element.database";
import { EmailService } from "./email.service";

describe("EmailService", () => {
  let service: EmailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [EmailService, UserRepository],
    }).compile();
    service = moduleRef.get(EmailService);
  });

  it("should be right", () => {
    expect(service.sendCode).toBeInstanceOf(Function);
    expect(service.deleteCode).toBeInstanceOf(Function);
    expect(service.checkCode).toBeInstanceOf(Function);
  });
});
