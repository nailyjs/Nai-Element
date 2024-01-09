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
