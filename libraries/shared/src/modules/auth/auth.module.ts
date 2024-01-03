import { Module } from "@nestjs/common";
import { CommonAuthService } from "./auth.service";

@Module({
  providers: [CommonAuthService],
})
export class CommonAuthModule {}
