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

import { beforeEach, describe, expect } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { ThrottlerBehindProxyGuard } from "cc.naily.element.shared";
import { APP_GUARD } from "@nestjs/core";
import { AppModule } from "./app.module";
import "jest";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerBehindProxyGuard,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it("should return 1000", () => {
    expect(appController.getHello()).toBe(1000);
  });
});
