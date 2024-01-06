import { Module } from "@nestjs/common";
import { EmailService } from "../../providers/email.service";
import { EmailController } from "./controllers/email.controller";
import { UserRepository } from "cn.watchrss.element.database";

@Module({
  controllers: [EmailController],
  providers: [EmailService, UserRepository],
})
export class TransportModule {}
