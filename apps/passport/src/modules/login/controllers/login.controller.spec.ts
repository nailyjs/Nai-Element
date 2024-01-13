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
