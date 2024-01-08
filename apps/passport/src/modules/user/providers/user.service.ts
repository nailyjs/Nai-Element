/**
 * @Date 2024-01-08 16-48-04
 * @Author Zero 1203970284@qq.com
 * @FilePath apps/passport/src/modules/user/providers
 * @CreatedBy WebStorm
 * @Copyright (c) 2024 by Zero, All Rights Reserved.
 */

import { BadRequestException, Injectable } from "@nestjs/common";
import { UserControlRepository, UserRepository } from "cc.naily.element.database";

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
  public async getUserByLogging(userID: number) {
    const user = await this.userRepository.findOne({
      where: { userID },
      select: { password: false },
    });
    if (!user) throw new BadRequestException(1015);
    return { user };
  }

  /**
   * 未登录获取用户信息
   *
   * @memberof UserService
   * @param {number} userID 用户id
   * @since 2024
   */
  public async getUserByGuest(userID: number) {
    const userControl = await this.userControlRepository.findOne({
      where: { user: { userID } },
    });
    if (!userControl) throw new BadRequestException(1015);

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
}
