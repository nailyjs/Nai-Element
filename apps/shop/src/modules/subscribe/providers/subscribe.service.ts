import { BadRequestException, Injectable } from "@nestjs/common";
import {
  ShopSubscribe,
  ShopSubscribeRepository,
  User,
  UserSubscribeOrder,
  UserSubscribeOrderRepository,
  UserValueRepository,
} from "cc.naily.element.database";

@Injectable()
export class SubscribeService {
  constructor(
    private readonly shopSubscribeRepository: ShopSubscribeRepository,
    private readonly userSubscribeOrderRepository: UserSubscribeOrderRepository,
    private readonly userValueRepository: UserValueRepository,
  ) {}

  public async getSubscribeList() {
    return await this.shopSubscribeRepository.find();
  }

  public async getSubscribeSingle(subscribeID: number) {
    return await this.shopSubscribeRepository.findOneBy({ subscribeID });
  }

  public async subscribe(subscribeID: number, userID: number) {
    const oldSubscribe = await this.userSubscribeOrderRepository.findOneBy({
      shopSubscribe: { subscribeID },
      user: { userID },
    });
    if (oldSubscribe) throw new BadRequestException(1030);

    const subscribe = new UserSubscribeOrder();
    subscribe.shopSubscribe = await this.shopSubscribeRepository.findOneBy({ subscribeID });
    if (!subscribe.shopSubscribe) throw new BadRequestException(1032);
    subscribe.user = { userID } as User;
    subscribe.subscribedAt = new Date();
    subscribe.status = "active";
    subscribe.expiredAt = new Date(new Date().getTime() + subscribe.shopSubscribe.duration * 24 * 60 * 60 * 1000);

    const userValue = await this.userValueRepository.findOneBy({ user: { userID } });
    if (userValue.balance < subscribe.shopSubscribe.price) throw new BadRequestException(1031);
    const canReduce = await this.userValueRepository.reduceBalance(userID, subscribe.shopSubscribe.price);
    if (!canReduce) throw new BadRequestException(1031);
    return await this.userSubscribeOrderRepository.save(subscribe);
  }

  public async createSubscribe(title: string, introduction: string, duration: number, price: number, userID: number) {
    const shopSubscribe = new ShopSubscribe();
    shopSubscribe.title = title;
    shopSubscribe.introduction = introduction;
    shopSubscribe.duration = duration;
    shopSubscribe.price = price;
    shopSubscribe.author = { userID } as User;
    return await this.shopSubscribeRepository.save(shopSubscribe);
  }

  public async getSubscribeStatus(subscribeID: number, userID: number) {
    const subscribe = await this.userSubscribeOrderRepository.findOneBy({
      shopSubscribe: { subscribeID },
      user: { userID },
    });
    if (!subscribe) throw new BadRequestException(1033);
    if (subscribe.expiredAt.getTime() < new Date().getTime()) {
      subscribe.status = "expired";
      await this.userSubscribeOrderRepository.save(subscribe);
    }

    return subscribe;
  }
}
