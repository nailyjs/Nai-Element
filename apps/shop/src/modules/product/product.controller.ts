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

import { Body, Controller, Delete, Get, NotFoundException, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ShopProduct, ShopProductRepository, ShopProductTagRepository, User as UserEntity, UserRepository } from "cc.naily.element.database";
import { DeletedeleteProductDTO, GetProductDTO, PostCreateProductDTO, PostSearchProductDTO } from "./dtos/product/product.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { Auth, User } from "cc.naily.element.auth";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { ProductService } from "./providers/product.service";

@ApiTags("产品")
@Controller("product")
@UseInterceptors(CacheInterceptor)
@CacheTTL(1000 * 20 /* 20秒 缓存GET请求 */)
export class ProductController {
  constructor(
    private readonly shopProductRepository: ShopProductRepository,
    private readonly userRepository: UserRepository,
    private readonly shopProductTagRepository: ShopProductTagRepository,
    private readonly productService: ProductService,
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
    return this.productService.list(query);
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
    @User() user: Omit<UserEntity, "password">,
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
    product.user = await this.userRepository.findOneByControl(user.userID, true);
    return this.shopProductRepository.save(product, {
      transaction: true,
    });
  }

  /**
   * 搜索商品
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {PostSearchProductDTO} query
   * @memberof ProductController
   */
  @Get("search")
  @UseInterceptors(ResInterceptor)
  public async searchProduct(@Query() query: PostSearchProductDTO) {
    const [list, count] = await this.productService.list(query, query.keyword);
    return { count, list };
  }

  /**
   * 删除商品
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {number} productID
   * @memberof ProductController
   */
  @Delete()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async deleteProduct(@Body() body: DeletedeleteProductDTO, @User() user: Omit<UserEntity, "password">) {
    if (typeof body.productID === "number") {
      const product = await this.shopProductRepository.findOneBy({ productID: body.productID, user: { userID: user.userID } });
      if (!product) throw new NotFoundException(1027);
      await this.shopProductRepository.remove(product, {
        transaction: true,
      });
      return true;
    } else {
      for (const item of body.productID) {
        const product = await this.shopProductRepository.findOneBy({ productID: item, user: { userID: user.userID } });
        if (!product) throw new NotFoundException(1027);
        await this.shopProductRepository.remove(product, {
          transaction: true,
        });
      }
    }
  }
}
