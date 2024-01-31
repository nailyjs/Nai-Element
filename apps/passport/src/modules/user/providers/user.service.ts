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

import { BadRequestException, Injectable } from "@nestjs/common";
import { User, UserControlRepository, UserRepository } from "cc.naily.element.database";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userControlRepository: UserControlRepository,
  ) {}

  /**
   * 已登录获取用户信息
   *
   * @memberof UserService
   * @param {number} userID 用户id
   * @since 2024
   */
  public async getUserByLogging(userID: string) {
    const user = await this.userRepository.findOne({
      where: { userID },
      select: { password: false },
      relations: { userControls: true, userValues: true },
    });
    if (!user) throw new BadRequestException(1015);
    user.password = undefined;
    return { user };
  }

  /**
   * 未登录获取用户信息
   *
   * @memberof UserService
   * @param {number} userID 用户id
   * @since 2024
   */
  public async getUserByGuest(userID: string) {
    const userControl = await this.userControlRepository.findOne({
      where: { user: { userID } },
    });
    if (!userControl) await this.userRepository.registerControl(await this.userRepository.findOneBy({ userID }));

    const user = await this.userRepository.findOne({
      where: { userID },
      select: {
        password: false,
        email: userControl.publicEmail,
        phone: userControl.publicPhone,
      },
    });
    if (!user) throw new BadRequestException(1015);
    return { user };
  }

  /**
   * 更新头像
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @param {string} url 头像地址
   * @param {number} userID 用户id
   * @return {User}
   * @memberof UserService
   */
  public async updateAvatar(url: string, userID: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userID });
    if (!user) throw new BadRequestException(1015);
    user.avatar = url;
    return await this.userRepository.save(user);
  }

  public async updateUsername(username: string, userID: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userID });
    if (!user) throw new BadRequestException(1015);
    user.username = username;
    return await this.userRepository.save(user);
  }
}
