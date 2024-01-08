import { applyDecorators, UseGuards } from "@nestjs/common";
import { CommonMustAuthGuard, CommonOptionalAuthGuard } from "../modules/jwt";
import { ApiCookieAuth } from "@nestjs/swagger";

export function Auth(isOptional: boolean = false): MethodDecorator {
  return applyDecorators(ApiCookieAuth(), UseGuards(isOptional ? CommonOptionalAuthGuard : CommonMustAuthGuard));
}
