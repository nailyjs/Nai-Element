/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
 */

import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { BusinessModule } from "cc.naily.element.shared";
import { UserService } from "./providers/user.service";
import { UserControlRepository, UserRepository } from "cc.naily.element.database";

/**
 * 用户模块
 *
 * @class
 * @public
 * @since 2024
 * @author Zero <gczgroup@qq.com>
 */
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserControlRepository],
})
export class UserModule extends BusinessModule {}
