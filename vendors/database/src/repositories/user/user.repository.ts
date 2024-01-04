import { Repository, EntityRepository } from "../../decorators";
import { User } from "../../entities/user/user.entity";

@Repository
export class UserRepository extends EntityRepository<User> {}
