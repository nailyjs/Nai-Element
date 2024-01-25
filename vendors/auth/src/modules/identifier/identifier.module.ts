import { Module } from "@nestjs/common";
import { IdentifierService } from "./identifier.service";
import { UserIdentifierRepository } from "cc.naily.element.database";

@Module({
  providers: [IdentifierService, UserIdentifierRepository],
  exports: [IdentifierService],
})
export class IdentifierModule {}
