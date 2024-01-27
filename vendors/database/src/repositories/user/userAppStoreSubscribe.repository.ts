import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { UserAppStoreSubscribe } from "../../entities";

@Repository
export class UserAppStoreSubscribeRepository extends EntityRepository<UserAppStoreSubscribe> {
  constructor(private readonly dataSource: DataSource) {
    super(UserAppStoreSubscribe, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
