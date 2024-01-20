import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { UserSubscribeOrder } from "../../entities";

@Repository
export class UserSubscribeOrderRepository extends EntityRepository<UserSubscribeOrder> {
  constructor(dataSource: DataSource) {
    super(UserSubscribeOrder, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
