import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { User } from "../../entities";

@Repository
export class UserRepository extends EntityRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
