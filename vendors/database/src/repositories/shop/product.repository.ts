import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { ShopProduct } from "../../entities";

@Repository
export class ShopProductRepository extends EntityRepository<ShopProduct> {
  constructor(dataSource: DataSource) {
    super(ShopProduct, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
