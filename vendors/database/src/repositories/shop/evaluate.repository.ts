import { DataSource, TreeRepository } from "typeorm";
import { Repository } from "../../decorators";
import { User } from "../../entities/user/user.entity";
import { ShopEvaluate } from "../../entities/shop/evaluate.entity";
import { ShopProduct } from "../../entities/shop/product.entity";

@Repository
export class ShopEvaluateRepository extends TreeRepository<ShopEvaluate> {
  constructor(private readonly dataSource: DataSource) {
    super(ShopEvaluate, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  public async createEvaluate(content: string, user: User, product: ShopProduct) {
    const eva = new ShopEvaluate();
    eva.content = content;
    eva.user = user;
    eva.likeCount = 0;
    eva.product = product;
    return this.save(eva);
  }

  public async createSubEvaluate(content: string, user: User, parent: ShopEvaluate) {
    const eva = new ShopEvaluate();
    eva.content = content;
    eva.user = user;
    eva.likeCount = 0;
    eva.parent = parent;
    return this.save(eva);
  }
}
