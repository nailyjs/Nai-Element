import { Injectable } from "@nestjs/common";
import { UserControlRepository } from "cc.naily.element.database";

@Injectable()
export class UserControlService {
  constructor(private readonly userControlRepository: UserControlRepository) {}

  public updateEmailControl(isPublic: boolean, userID: string) {
    return this.userControlRepository.update(
      { publicEmail: isPublic },
      {
        user: {
          userID,
        },
      },
    );
  }

  public updatePhoneControl(isPublic: boolean, userID: string) {
    return this.userControlRepository.update(
      { publicPhone: isPublic },
      {
        user: {
          userID,
        },
      },
    );
  }

  public updateEvaluateLike(isPublic: boolean, userID: string) {
    return this.userControlRepository.update(
      { publicEvaluateLike: isPublic },
      {
        user: {
          userID,
        },
      },
    );
  }
}
