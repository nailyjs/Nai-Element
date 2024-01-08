import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { EmailService } from "../../providers/email.service";
import { UserRepository } from "cc.naily.element.database";
import { BusinessModule } from "cc.naily.element.shared";

@Module({
  controllers: [RegisterController],
  providers: [EmailService, UserRepository],
})
export class RegisterModule extends BusinessModule {}
