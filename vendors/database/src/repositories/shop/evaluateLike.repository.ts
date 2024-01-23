import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { ShopEvaluate, ShopEvaluateLike, User } from "../../entities";

@Repository
export class ShopEvaluateLikeRepository extends EntityRepository<ShopEvaluateLike> {
  constructor(private readonly dataSource: DataSource) {
    super(ShopEvaluateLike, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  public async createLike(user: User, shopEvaluate: ShopEvaluate) {
    let like = new ShopEvaluateLike();
    like.user = user;
    like.shopEvaluate = shopEvaluate;
    like = await this.save(like);
    shopEvaluate.likeCount++;
    await this.dataSource.getRepository(ShopEvaluate).save(shopEvaluate);
    return like;
  }

  public async deleteLike(user: User, shopEvaluate: ShopEvaluate) {
    const like = await this.findOneBy({ user, shopEvaluate });
    if (!like) return;
    await this.delete(like);
    shopEvaluate.likeCount--;
    await this.dataSource.getRepository(ShopEvaluate).save(shopEvaluate);
  }
}
