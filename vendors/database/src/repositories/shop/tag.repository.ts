import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { ShopProductTag } from "../../entities";

@Repository
export class ShopProductTagRepository extends EntityRepository<ShopProductTag> {
  constructor(dataSource: DataSource) {
    super(ShopProductTag, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
