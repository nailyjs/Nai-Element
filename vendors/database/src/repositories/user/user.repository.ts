import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { User, UserValue } from "../../entities";
import { genSaltSync, hashSync } from "bcrypt";
import { UserControl } from "../../entities/user/userControl.entity";

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

  /**
   * 使用邮箱凭据添加用户
   *
   * @param {string} email 邮箱
   * @param {string} username 用户名
   * @param {string} password 密码
   * @param {string} ip ip地址
   * @returns {Promise<Omit<User, "password">>} 用户
   * @memberof UserRepository
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public async registerByEmail(email: string, username: string, password: string, ip: string): Promise<Omit<User, "password">> {
    let user = new User();
    user.email = email;
    user.username = username;
    user.password = hashSync(password, genSaltSync());
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
}
