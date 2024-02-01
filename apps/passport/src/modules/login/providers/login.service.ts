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
import { User, UserRepository } from "cc.naily.element.database";
import { EmailService } from "../../../providers/email.service";
import { IdentifierService, JwtLoginPayload } from "cc.naily.element.auth";
import { ILoginPayload } from "cc.naily.element.auth";
import { PhoneService } from "../../../providers/phone.service";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly identifierService: IdentifierService,
    private readonly phoneService: PhoneService,
  ) {}

  private getJwtToken(user: User, loginPayload: ILoginPayload) {
    if (user.isDeleted) throw new NotFoundException(1056);
    return this.jwtService.sign({
      userID: user.userID,
      loginType: loginPayload.loginType,
      loginMethod: loginPayload.loginMethod,
      loginClient: loginPayload.loginClient,
      identifier: loginPayload.identifier,
    } satisfies JwtLoginPayload);
  }

  private updateIp(loginPayload: ILoginPayload, user: User) {
    user.ip = loginPayload.loginIP;
    return this.userRepository.save(user);
  }

  public async loginByUsernamePassword(username: string, password: string, loginPayload: ILoginPayload) {
    let user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(1007);
    if (!user.password) throw new BadRequestException(1034);
    if (!compareSync(password, user.password)) throw new ForbiddenException(1008);
    user = await this.updateIp(loginPayload, user);
    const access_token = this.getJwtToken(user, loginPayload);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }

  public async loginByEmailCode(email: string, verifyCode: number, loginPayload: ILoginPayload) {
    let user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(1007);
    user = await this.updateIp(loginPayload, user);
    await this.emailService.checkCode(email, verifyCode);
    const access_token = this.getJwtToken(user, loginPayload);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }

  public async loginByPhoneCode(phone: string, verifyCode: number, loginPayload: ILoginPayload) {
    let user = await this.userRepository.findOneBy({ phone });
    if (!user) throw new NotFoundException(1007);
    user = await this.updateIp(loginPayload, user);
    await this.phoneService.checkCode(phone, verifyCode);
    const access_token = this.getJwtToken(user, loginPayload);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }

  public async loginByQrCode(user: User, loginPayload: ILoginPayload) {
    if (!user) throw new NotFoundException(1007);
    user = await this.updateIp(loginPayload, user);
    const access_token = this.getJwtToken(user, loginPayload);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }
}
