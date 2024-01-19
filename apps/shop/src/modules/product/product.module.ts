import { Module } from "@nestjs/common";
import { BusinessModule } from "cc.naily.element.shared";
import { ProductController } from "./product.controller";
import { ShopProductRepository, ShopProductTagRepository } from "cc.naily.element.database";

@Module({
  controllers: [ProductController],
  providers: [ShopProductRepository, ShopProductTagRepository],
})
export class ProductModule extends BusinessModule {}
