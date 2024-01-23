import { ForbiddenException, Injectable } from "@nestjs/common";
import { ShopEvaluateLikeRepository, UserControlRepository } from "cc.naily.element.database";

@Injectable()
export class EvaluateLikeService {
  constructor(
    private readonly shopEvaluateLikeRepository: ShopEvaluateLikeRepository,
    private readonly userControlRepository: UserControlRepository,
  ) {}

  public async list(orderTime: "latest" | "oldest", loggingUserID: number, userID: number, take: number, skip: number) {
    if (loggingUserID != userID) {
      const userControl = await this.userControlRepository.findOneBy({ user: { userID } });
      if (!userControl.publicEvaluateLike) throw new ForbiddenException(1037);
    }
    const list = await this.shopEvaluateLikeRepository.find({
      take: take || 10,
      skip: skip || 0,
      where: userID ? { user: { userID } } : {},
      order: {
        updatedAt: orderTime === "oldest" ? "ASC" : "DESC",
      },
      relations: {
        shopEvaluate: {
          product: {
            user: true,
          },
        },
      },
    });
    return list.map((item) => {
      item.user = undefined;
      return item;
    });
  }
}
