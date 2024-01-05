import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";

@Module({
  controllers: [RegisterController],
})
export class RegisterModule {}
