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

  private async generateUsername(): Promise<string> {
    const username = `用户${Math.floor(Math.random() * (99999999 - 100000 + 1) + 1000000)}`;
    const user = await this.userRepository.checkUsername(username);
    if (user) return await this.generateUsername();
    return username;
  }

  public async registerByEmailPassword(email: string, username: string, ip: string) {
    if (!username) username = await this.generateUsername();
    const user = await this.userRepository.checkEmailOrUsername(email, username);
    if (user && user.email === email) throw new ForbiddenException(1009);
    if (user && user.username === username) throw new ForbiddenException(1048);
    return await this.userRepository.registerByEmail(email, username, ip);
  }

  public async registerByPhonePassword(phone: string, username: string, ip: string) {
    if (!username) username = await this.generateUsername();
    const checkUsername = await this.userRepository.checkUsername(username);
    const checkPhone = await this.userRepository.checkPhone(phone);
    if (checkPhone) throw new ForbiddenException(1049);
    if (checkUsername) throw new ForbiddenException(1048);
    return await this.userRepository.registerByPhone(phone, username, ip);
  }
}
