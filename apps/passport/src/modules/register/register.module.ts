import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { EmailService } from "../../providers/email.service";
import { UserRepository } from "cc.naily.element.database";

@Module({
  controllers: [RegisterController],
  providers: [EmailService, UserRepository],
})
export class RegisterModule {}
