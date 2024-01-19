import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ShopProductRepository } from "cc.naily.element.database";
import { GetProductDTO } from "./dtos/product/product.dto";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("产品")
@Controller("product")
export class ProductController {
  constructor(private readonly shopProductRepository: ShopProductRepository) {}

  /**
   * 获取商品列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @memberof ProductController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public listProduct(@Query() query: GetProductDTO): Promise<Array<any>> {
    if (typeof query.filterTags === "string") query.filterTags = [query.filterTags];
    return this.shopProductRepository.find({
      cache: true,
      order: {
        productID: query.orderTime === "oldtest" ? "ASC" : "DESC",
      },
      where: (query.filterTags || []).map((item) => {
        return {
          productStatus: "up",
          productTags: {
            productTagID: item,
          },
        };
      }),
    });
  }
}
