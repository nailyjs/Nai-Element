import { Module } from "@nestjs/common";
import { BusinessModule } from "cc.naily.element.shared";
import { ProductController } from "./product.controller";
import { ShopProductRepository, ShopProductTagRepository, UserRepository } from "cc.naily.element.database";
import { ProductService } from "./providers/product.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService, ShopProductRepository, UserRepository, ShopProductTagRepository],
})
export class ProductModule extends BusinessModule {}
