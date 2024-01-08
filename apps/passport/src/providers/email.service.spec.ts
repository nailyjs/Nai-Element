import { beforeEach, describe, expect, it } from "vitest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { UserRepository } from "cc.naily.element.database";
import { EmailService } from "./email.service";

describe("EmailService", () => {
  it("should be right", async () => {
    let service: EmailService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
        providers: [EmailService, UserRepository],
      }).compile();
      service = moduleRef.get(EmailService);

      expect(service.deleteCode).toBeDefined();
      expect(service.checkCode).toBeDefined();
      expect(service.sendCode).toBeDefined();
    });
  });
});
