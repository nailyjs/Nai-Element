import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { BrowserBookMark, User } from "../../entities";

@Repository
export class BrowserBookMarkRepository extends EntityRepository<BrowserBookMark> {
  constructor(private readonly dataSource: DataSource) {
    super(BrowserBookMark, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  public createBookmark(user: User, title: string, icon: string, color: string, link: string, index: number) {
    const bookmark = new BrowserBookMark();
    bookmark.user = user;
    bookmark.bookMarkTitle = title;
    bookmark.bookMarkIcon = icon;
    bookmark.bookMarkColor = color;
    bookmark.bookMarkLink = link;
    bookmark.bookMarkIndex = index;
    return bookmark;
  }
}
