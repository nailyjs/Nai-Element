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

import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserRepository } from "cc.naily.element.database";

@Injectable()
export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerByEmailPassword(email: string, username: string, ip: string) {
    const user = await this.userRepository.checkEmailOrUsername(email, username);
    if (user && user.email === email) throw new ForbiddenException(1009);
    if (user && user.username === username) throw new ForbiddenException(1048);
    return await this.userRepository.registerByEmail(email, username, ip);
  }

  public async registerByPhonePassword(phone: string, username: string, ip: string) {
    const user = await this.userRepository.checkPhoneOrUsername(phone, username);
    if (user && user.phone === phone) throw new ForbiddenException(1049);
    if (user && user.username === username) throw new ForbiddenException(1048);
    return await this.userRepository.registerByPhone(phone, username, ip);
  }
}
