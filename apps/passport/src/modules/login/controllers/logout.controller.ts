/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { Auth, JwtLoginPayload, Token, User } from "cc.naily.element.auth";
import { User as UserEntity, UserIdentifierRepository } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("登出")
@Controller("logout")
export class LogoutController {
  constructor(
    private readonly userIdentifierRepository: UserIdentifierRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 登出
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @param {UserEntity} user
   * @param {string} token
   * @return {*}
   * @memberof LogoutController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async logout(@User() user: UserEntity, @Token() token: string) {
    const jwtPayload: JwtLoginPayload = this.jwtService.decode(token);
    const userIdentifier = await this.userIdentifierRepository.findOneBy({
      user: {
        userID: user.userID,
      },
      identifier: jwtPayload.identifier,
      loginClient: jwtPayload.loginClient,
      loginMethod: jwtPayload.loginMethod,
      loginType: jwtPayload.loginType,
    });
    await this.userIdentifierRepository.remove(userIdentifier);
    return 1043;
  }
}
