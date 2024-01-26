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

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { UserRepository } from "cc.naily.element.database";
import { EmailService } from "../../../providers/email.service";
import { IdentifierService, LoginType } from "cc.naily.element.auth";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly identifierService: IdentifierService,
  ) {}

  public async loginByUsernamePassword(username: string, password: string, loginType: LoginType, loginClient?: string, identifier?: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(1007);
    if (!user.password) throw new BadRequestException(1034);
    if (!compareSync(password, user.password)) throw new ForbiddenException(1008);
    const access_token = this.jwtService.sign({ userID: user.userID, loginType, loginClient, identifier });
    const isSuccess = await this.identifierService.renewIdentifier(user, loginType, loginClient, identifier);
    if (isSuccess === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      access_token,
    };
  }

  public async loginByEmailCode(email: string, verifyCode: number, loginType: LoginType, loginClient?: string, identifier?: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(1007);
    await this.emailService.checkCode(email, verifyCode);
    const access_token = this.jwtService.sign({ userID: user.userID, loginType, loginClient, identifier });
    const isSuccess = await this.identifierService.renewIdentifier(user, loginType, loginClient, identifier);
    if (isSuccess === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      access_token,
    };
  }

  public async loginByPhoneCode(phone: string, verifyCode: number, loginType: LoginType, loginClient?: string, identifier?: string) {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) throw new NotFoundException(1007);
    await this.emailService.checkCode(phone, verifyCode);
    const access_token = this.jwtService.sign({ userID: user.userID, loginType, loginClient, identifier });
    const isSuccess = await this.identifierService.renewIdentifier(user, loginType, loginClient, identifier);
    if (isSuccess === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      access_token,
    };
  }
}
