/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

  public getAllSubscriptionStatuses(userID: string) {
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
