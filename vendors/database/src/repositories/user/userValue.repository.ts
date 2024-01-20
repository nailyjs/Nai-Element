/**
 * @Date 2024-01-08 16-33-07
 * @Author Zero 1203970284@qq.com
 * @FilePath vendors/database/src/repositories/user
 * @CreatedBy WebStorm
 * @Copyright (c) 2024 by Zero, All Rights Reserved.
 */

import { EntityRepository, Repository } from "../../decorators";
import { UserValue } from "../../entities";
import { DataSource } from "typeorm";

@Repository
export class UserValueRepository extends EntityRepository<UserValue> {
  constructor(dataSource: DataSource) {
    super(UserValue, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  /**
   * 直接减少用户余额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/21
   * @param {number} userID 用户ID
   * @param {number} amount 减少的金额
   * @return {Promise<false | UserValue>} false表示余额不足
   * @memberof UserValueRepository
   */
  public async reduceBalance(userID: number, amount: number): Promise<false | UserValue> {
    const value = await this.findOneBy({ user: { userID } });
    value.balance -= amount;
    if (value.balance < 0) return false;
    return this.save(value);
  }
}
