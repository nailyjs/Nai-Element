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
}
