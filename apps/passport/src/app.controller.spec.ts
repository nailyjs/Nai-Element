import { beforeEach, describe, expect, it } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { ThrottlerBehindProxyGuard } from "cc.naily.element.shared";
import { APP_GUARD } from "@nestjs/core";
import { AppModule } from "./app.module";

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

  describe("root", () => {
    it("should return 1000", () => {
      expect(appController.getHello()).toBe(1000);
    });
  });
});
