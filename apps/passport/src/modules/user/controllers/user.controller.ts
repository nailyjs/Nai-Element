/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
 */

import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../providers/user.service";
import { ResInterceptor } from "cc.naily.element.shared";
import { SwaggerResponse } from "cc.naily.element.swagger";
import { GetLoggingUser200ResDTO } from "../dtos/user/logging/logging.res.dto";
import { Auth, User } from "cc.naily.element.auth";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取已登录用户信息
   *
   * @memberof UserController
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  @Auth()
  @Get("logging")
  @UseInterceptors(ResInterceptor)
  @SwaggerResponse(GetLoggingUser200ResDTO)
  public getLoggingUser(@User() user: Express.Request.user) {
    return this.userService.getUserByLogging(user.userID);
  }
}
