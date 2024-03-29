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

import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import {
  BrowserBookMark,
  ShopEvaluateLike,
  ShopProduct,
  ShopSubscribe,
  User,
  UserAppStoreSubscribe,
  UserControl,
  UserIdentifier,
  UserValue,
} from "../../entities";

@Repository
export class UserRepository extends EntityRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  /**
   * 查找邮箱是否存在
   *
   * @param {string} email 邮箱
   * @returns {(Promise<User | null>)} 用户
   * @memberof UserRepository
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public checkEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  }

  /**
   * 查找用户名是否存在
   *
   * @param {string} username 用户名
   * @returns {(Promise<User | null>)} 用户
   * @memberof UserRepository
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public checkUsername(username: string): Promise<User | null> {
    return this.findOneBy({ username });
  }

  public checkPhone(phone: string): Promise<User | null> {
    return this.findOneBy({ phone });
  }

  public updateIp(ip: string, userID: string): Promise<any> {
    return this.update({ userID }, { ip });
  }

  /**
   * 查找邮箱或用户名是否存在
   *
   * @param {string} email 邮箱
   * @param {string} username 用户名
   * @returns {(Promise<User | null>)} 用户
   * @memberof UserRepository
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public checkEmailOrUsername(email: string, username: string): Promise<User | null> {
    const hasEmail = this.checkEmail(email);
    const hasUsername = this.checkUsername(username);
    if (hasEmail) return hasEmail;
    if (hasUsername) return hasUsername;
    return null;
  }

  public async checkPhoneOrUsername(phone: string, username: string): Promise<["phone" | "username", User] | null> {
    const hasPhone = await this.checkPhone(phone);
    const hasUsername = await this.checkUsername(username);
    if (hasPhone) return ["phone", hasPhone];
    if (hasUsername) return ["username", hasUsername];
    return null;
  }

  /**
   * 使用邮箱凭据添加用户
   *
   * @param {string} email 邮箱
   * @param {string} username 用户名
   * @param {string} ip ip地址
   * @returns {Promise<Omit<User, "password">>} 用户
   * @memberof UserRepository
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public async registerByEmail(email: string, username: string, ip: string): Promise<Omit<User, "password">> {
    let user = new User();
    user.email = email;
    user.username = username;
    user.ip = ip;
    user = await this.save(user);
    await this.registerValue(user);
    await this.registerControl(user);
    user.password = undefined;
    return user;
  }

  public async registerByPhone(phone: string, username: string, ip: string): Promise<Omit<User, "password">> {
    let user = new User();
    user.phone = phone;
    user.username = username;
    user.ip = ip;
    user = await this.save(user);
    await this.registerValue(user);
    await this.registerControl(user);
    user.password = undefined;
    return user;
  }

  /**
   * 注册用户控制
   *
   * @private
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public registerControl(user: User) {
    const control = new UserControl();
    control.publicEmail = true;
    control.publicPhone = true;
    control.user = user;
    return this.dataSource.getRepository(UserControl).save(control);
  }

  /**
   * 注册用户金额
   *
   * @private
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public registerValue(user: User) {
    const value = new UserValue();
    value.user = user;
    return this.dataSource.getRepository(UserValue).save(value);
  }

  /**
   * 根据用户的权限查找用户 并排除掉不公开的信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {User} user
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  public async excludeControl(user: User, excludePassword: boolean = true): Promise<User> {
    const control = (await this.dataSource.getRepository(UserControl).findOneBy({ user: { userID: user.userID } })) || ({} as UserControl);
    if (!control) return user;
    if (!control.publicEmail) user.email = undefined;
    if (!control.publicPhone) user.phone = undefined;
    if (excludePassword) user.password = undefined;
    return user;
  }

  /**
   * 根据用户的权限查找用户
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {number} userID 用户ID
   * @param [excludePassword=true] 是否排除密码
   * @return {Promise<User>}
   * @memberof UserRepository
   */
  public async findOneByControl(userID: string, excludePassword: boolean = false): Promise<User> {
    const user = await this.findOne({ where: { userID } });
    if (excludePassword) user.password = undefined;
    return this.excludeControl(user, excludePassword);
  }

  /**
   * 删除账号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @param {User} userInstance
   * @return {*}
   * @memberof UserRepository
   */
  public async logoff(userInstance: User): Promise<boolean> {
    userInstance.isDeleted = true;
    userInstance.email = null;
    userInstance.phone = null;
    await this.save(userInstance);

    const broswerBookMarkRepository = this.dataSource.getRepository(BrowserBookMark);
    const broswerBookMarks = await broswerBookMarkRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (broswerBookMarks) await broswerBookMarkRepository.remove(broswerBookMarks);

    const browserTrackRepository = this.dataSource.getRepository(BrowserBookMark);
    const browserTracks = await browserTrackRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (browserTracks.length) await browserTrackRepository.remove(browserTracks);

    const shopEvaluateRepository = this.dataSource.getRepository(BrowserBookMark);
    const shopEvaluates = await shopEvaluateRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (shopEvaluates.length) await shopEvaluateRepository.remove(shopEvaluates);

    const shopEvaluateLikesRepository = this.dataSource.getRepository(ShopEvaluateLike);
    const shopEvaluateLikes = await shopEvaluateLikesRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (shopEvaluateLikes.length) await shopEvaluateLikesRepository.remove(shopEvaluateLikes);

    const shopProductRepository = this.dataSource.getRepository(ShopProduct);
    const shopProducts = await shopProductRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (shopProducts.length) await shopProductRepository.remove(shopProducts);

    const shopSubscribeRepository = this.dataSource.getRepository(ShopSubscribe);
    const shopSubscribes = await shopSubscribeRepository.find({ where: { author: { userID: userInstance.userID } } });
    if (shopSubscribes.length) await shopSubscribeRepository.remove(shopSubscribes);

    const userAppStoreSubscribeRepository = this.dataSource.getRepository(UserAppStoreSubscribe);
    const userAppStoreSubscribes = await userAppStoreSubscribeRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (userAppStoreSubscribes.length) await userAppStoreSubscribeRepository.remove(userAppStoreSubscribes);

    const userIdentifierRepository = this.dataSource.getRepository(UserIdentifier);
    const userIdentifiers = await userIdentifierRepository.find({ where: { user: { userID: userInstance.userID } } });
    if (userIdentifiers.length) await userIdentifierRepository.remove(userIdentifiers);

    return true;
  }
}
