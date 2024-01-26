import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CommonAppStoreService } from "cc.naily.element.shared";

@Injectable()
export class AppleService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commonAppStoreService: CommonAppStoreService,
  ) {
    this.checkPay();
  }

  public async checkPay() {
    const client = this.commonAppStoreService.createClient("");
    const status = await client.getAllSubscriptionStatuses("");
    console.log(status);
  }
}
