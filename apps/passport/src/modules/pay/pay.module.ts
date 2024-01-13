import { Module } from "@nestjs/common";
import { BusinessModule } from "cc.naily.element.shared";
import { XunhupayController } from "./controllers/xunhupay.controller";
import { XunhupayService } from "./providers/xunhupay.service";
import { HttpModule } from "@nestjs/axios";
import { PayService } from "./providers/pay.service";
import { UserOrderRepository } from "cc.naily.element.database";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      method: "POST",
    }),
  ],
  controllers: [XunhupayController],
  providers: [XunhupayService, PayService, UserOrderRepository],
})
export class PayModule extends BusinessModule {}
