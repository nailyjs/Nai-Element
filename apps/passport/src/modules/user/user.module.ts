/**
 * @Date 2024-01-08 15-43-39
 * @Author Zero 1203970284@qq.com
 * @FilePath apps/passport/src/modules/user
 * @CreatedBy WebStorm
 * @Copyright (c) 2024 by Zero, All Rights Reserved.
 */

import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { BusinessModule } from "cc.naily.element.shared";
import { UserService } from "./providers/user.service";
import { UserControlRepository, UserRepository } from "cc.naily.element.database";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserControlRepository],
})
export class UserModule extends BusinessModule {}
