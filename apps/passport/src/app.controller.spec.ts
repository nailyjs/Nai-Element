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
