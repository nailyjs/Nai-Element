import { Injectable } from "@nestjs/common";
import { AppStoreServerAPIClient, Environment } from "@apple/app-store-server-library";
import { ConfigService } from "@nestjs/config";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

@Injectable()
export class CommonAppStoreService {
  constructor(private readonly configService: ConfigService) {}

  getSigningKey() {
    if (process.env.NODE_ENV && existsSync(join(process.env.PROJECT_ROOT, `public/${process.env.NODE_ENV}/apple_store.p8`))) {
      return readFileSync(join(process.env.PROJECT_ROOT, `public/${process.env.NODE_ENV}/apple_store.p8`)).toString();
    } else if (existsSync(join(process.env.PROJECT_ROOT, "public/apple_store.p8"))) {
      return readFileSync(join(process.env.PROJECT_ROOT, "public/apple_store.p8")).toString();
    } else {
      throw new Error("apple_store.p8 not found");
    }
  }

  createClient(bundleId: string) {
    const signingKey = this.getSigningKey();
    const keyId = this.configService.getOrThrow<string>("global.apple.storekit.keyId");
    const issuerId = this.configService.getOrThrow<string>("global.apple.storekit.issuerId");
    const environment = this.configService.getOrThrow<Environment>("global.apple.storekit.environment");

    return new AppStoreServerAPIClient(signingKey, keyId, issuerId, bundleId, environment);
  }
}
