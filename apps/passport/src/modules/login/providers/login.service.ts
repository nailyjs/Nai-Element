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

import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { UserRepository } from "cc.naily.element.database";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async loginByUsernamePassword(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(1007);
    if (!compareSync(password, user.password)) throw new ForbiddenException(1008);
    const access_token = this.jwtService.sign({ userID: user.userID });
    user.password = undefined;
    return {
      user,
      access_token,
    };
  }
}
