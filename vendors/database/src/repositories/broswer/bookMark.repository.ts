import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { BrowserBookMark } from "../../entities";

@Repository
export class BrowserBookMarkRepository extends EntityRepository<BrowserBookMark> {
  constructor(private readonly dataSource: DataSource) {
    super(BrowserBookMark, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
