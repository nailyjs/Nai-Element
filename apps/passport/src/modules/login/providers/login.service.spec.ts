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

import { beforeEach, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import { LoginService } from "./login.service";
import { UserRepository } from "cc.naily.element.database";
import { AppModule } from "../../../app.module";
import "jest";

describe("LoginService", () => {
  let loginService: LoginService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [LoginService, UserRepository],
    }).compile();
    loginService = moduleRef.get(LoginService);
  });

  it("should be return loginByUsernamePassword", () => {
    expect(loginService.loginByUsernamePassword).toBeDefined();
  });
});
