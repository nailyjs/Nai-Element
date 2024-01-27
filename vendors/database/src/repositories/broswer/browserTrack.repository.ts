import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { BrowserTrack } from "../../entities";

@Repository
export class BrowserTrackRepository extends EntityRepository<BrowserTrack> {
  constructor(private readonly dataSource: DataSource) {
    super(BrowserTrack, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
