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

import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "cc.naily.element.database";
import { JwtLoginPayload } from "./jwt.type";
import { IdentifierService } from "../identifier";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly identifierService: IdentifierService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("global.jwt.secret"),
    } as StrategyOptions);
  }

  async validate(payload: JwtLoginPayload) {
    if (!payload) throw new ForbiddenException(1006);
    if (!payload.userID) throw new ForbiddenException(1006);
    if (!payload.loginType) throw new ForbiddenException(1006);
    const user = await this.userRepository.findOne({
      where: { userID: payload.userID },
    });
    const status = await this.identifierService.checkIdentifier(user, payload.loginType, payload.loginClient, payload.identifier);
    if (status === "ERROR") throw new ForbiddenException(1038);
    return user;
  }
}
