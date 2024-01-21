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

import { Test } from "@nestjs/testing";
import { LoginController } from "./login.controller";
import { AppModule } from "../../../app.module";
import { LoginService } from "../providers/login.service";
import { UserRepository } from "cc.naily.element.database";

describe("loginController", () => {
  it("should be defined", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [LoginController],
      providers: [LoginService, UserRepository],
    }).compile();

    expect(moduleRef.get(LoginController).loginByUsernamePassword).toBeDefined();
  });
});
