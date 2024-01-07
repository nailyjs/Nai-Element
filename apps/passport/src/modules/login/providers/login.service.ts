import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { UserRepository } from "cc.naily.element.database";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async loginByUsernamePassword(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username, password });
    if (!user) throw new NotFoundException(1007);
    if (!compareSync(password, user.password)) throw new ForbiddenException(1008);
    const access_token = this.jwtService.sign({ userID: user.userID });
    user.password = undefined;
    return {
      user,
      access_token,
    };
  }
}
