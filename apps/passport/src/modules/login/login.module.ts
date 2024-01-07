import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller";
import { LoginService } from "./providers/login.service";
import { UserRepository } from "cc.naily.element.database";

@Module({
  controllers: [LoginController],
  providers: [LoginService, UserRepository],
})
export class LoginModule {}
