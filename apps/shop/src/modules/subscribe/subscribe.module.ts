import { Module } from "@nestjs/common";
import { ShopSubscribeRepository, UserSubscribeOrderRepository, UserValueRepository } from "cc.naily.element.database";
import { BusinessModule } from "cc.naily.element.shared";
import { SubscribeController } from "./controllers/subscribe.controller";
import { SubscribeService } from "./providers/subscribe.service";

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService, UserValueRepository, ShopSubscribeRepository, UserSubscribeOrderRepository],
})
export class SubscribeModule extends BusinessModule {}
