import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserRepository } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("用户")
@Controller("user/check")
export class UserCheckController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  @UseInterceptors(ResInterceptor)
  public async check() {}
}
