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
