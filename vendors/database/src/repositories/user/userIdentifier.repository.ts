import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { UserIdentifier } from "../../entities";

@Repository
export class UserIdentifierRepository extends EntityRepository<UserIdentifier> {
  constructor(private readonly dataSource: DataSource) {
    super(UserIdentifier, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
