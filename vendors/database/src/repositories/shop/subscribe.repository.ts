import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { ShopSubscribe } from "../../entities";

@Repository
export class ShopSubscribeRepository extends EntityRepository<ShopSubscribe> {
  constructor(dataSource: DataSource) {
    super(ShopSubscribe, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
