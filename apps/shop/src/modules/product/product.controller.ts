import { Body, Controller, Get, NotFoundException, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ShopProduct, ShopProductRepository, ShopProductTagRepository } from "cc.naily.element.database";
import { GetProductDTO, PostCreateProductDTO } from "./dtos/product/product.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { Auth } from "cc.naily.element.auth";

@ApiTags("产品")
@Controller("product")
export class ProductController {
  constructor(
    private readonly shopProductRepository: ShopProductRepository,
    private readonly shopProductTagRepository: ShopProductTagRepository,
  ) {}

  /**
   * 获取商品列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @memberof ProductController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public listProduct(@Query() query: GetProductDTO): Promise<Array<unknown>> {
    if (!Array.isArray(query.filterTags)) query.filterTags = [query.filterTags];
    if (!query.orderTime) query.orderTime = "latest";
    if (!query.orderHot) query.orderHot = "hottest";
    return this.shopProductRepository.find({
      cache: true,
      order: {
        updatedAt: query.orderTime === "oldest" ? "ASC" : "DESC",
        productView: query.orderHot === "coldest" ? "ASC" : "DESC",
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

  /**
   * 创建商品
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @memberof ProductController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async createProduct(
    @Body() { productName, productIntroduction, productPrice, productDiscountPrice, productStock, productTags, productStatus }: PostCreateProductDTO,
  ): Promise<unknown> {
    const product = new ShopProduct();
    product.productName = productName;
    product.productPrice = productPrice;
    product.productDiscountPrice = productDiscountPrice;
    product.productStock = productStock;
    product.productIntroduction = productIntroduction;
    product.productTags = await Promise.all(
      productTags.map(async (item) => {
        const tag = await this.shopProductTagRepository.findOneBy({ productTagID: item });
        if (!tag) throw new NotFoundException(1025);
        return tag;
      }),
    );
    product.productStatus = productStatus ? "up" : "down";
    return this.shopProductRepository.save(product, {
      transaction: true,
    });
  }
}
