import { Status } from "@apple/app-store-server-library";
import { Injectable } from "@nestjs/common";
import { User, UserAppStoreSubscribe, UserAppStoreSubscribeRepository } from "cc.naily.element.database";
import { CommonAppStoreService } from "cc.naily.element.shared";

@Injectable()
export class AppleService {
  constructor(
    private readonly commonAppStoreService: CommonAppStoreService,
    private readonly userAppStoreSubscribeRepository: UserAppStoreSubscribeRepository,
  ) {}

  public getAllSubscriptionStatuses(userID: number) {
    return this.userAppStoreSubscribeRepository.find({
      where: { user: { userID } },
    });
  }

  public async linkTransactionID(user: User, transactionId: string) {
    const hasTransactionID = await this.userAppStoreSubscribeRepository.findOneBy({ originalTransactionID: transactionId });
    if (hasTransactionID) return 1000;
    const userAppStoreSubscribe = new UserAppStoreSubscribe();
    userAppStoreSubscribe.originalTransactionID = transactionId;
    userAppStoreSubscribe.user = user;
    return this.userAppStoreSubscribeRepository.save(userAppStoreSubscribe);
  }

  public checkTransactionID(bundleId: string, transactionId: string) {
    return this.commonAppStoreService.createClient(bundleId).getAllSubscriptionStatuses(transactionId, [Status.ACTIVE, Status.BILLING_GRACE_PERIOD]);
  }
}
