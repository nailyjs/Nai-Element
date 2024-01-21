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
