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

  public linkTransactionID(user: User, transactionId: string) {
    const userAppStoreSubscribe = new UserAppStoreSubscribe();
    userAppStoreSubscribe.originalTransactionID = transactionId;
    userAppStoreSubscribe.user = user;
    return this.userAppStoreSubscribeRepository.save(userAppStoreSubscribe);
  }

  public async checkTransactionID(bundleId: string, transactionId: string) {
    const statuses = await this.commonAppStoreService
      .createClient(bundleId)
      .getAllSubscriptionStatuses(transactionId, [Status.ACTIVE, Status.BILLING_GRACE_PERIOD]);
    console.log(statuses);
    return statuses;
  }
}
