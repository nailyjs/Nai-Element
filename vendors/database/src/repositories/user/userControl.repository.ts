/**
 * @Date 2024-01-08 16-31-25
 * @Author Zero 1203970284@qq.com
 * @FilePath vendors/database/src/repositories/user
 * @CreatedBy WebStorm
 * @Copyright (c) 2024 by Zero, All Rights Reserved.
 */

import { EntityRepository, Repository } from "../../decorators";
import { DataSource } from "typeorm";
import { UserControl } from "../../entities/user/userControl.entity";

@Repository
export class UserControlRepository extends EntityRepository<UserControl> {
  constructor(dataSource: DataSource) {
    super(UserControl, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
