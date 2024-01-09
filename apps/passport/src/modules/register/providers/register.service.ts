/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
 */

import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, UserRepository } from "cc.naily.element.database";
import { genSaltSync, hashSync } from "bcrypt";

@Injectable()
export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerByEmailPassword(email: string, username: string, password: string, ip: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new ForbiddenException(1009);
    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = hashSync(password, genSaltSync());
    newUser.ip = ip;
    await this.userRepository.save(newUser);
    user.password = undefined;
    return user;
  }
}
