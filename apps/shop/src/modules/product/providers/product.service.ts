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

import { Injectable } from "@nestjs/common";
import { GetProductDTO } from "../dtos/product/product.dto";
import { ShopProduct, ShopProductRepository, UserRepository } from "cc.naily.element.database";
import { FindOptionsWhere, Like } from "typeorm";

export interface ProductService {
  /**
   * 获取商品列表
   *
   * @description keyword参数不存在，返回`ShopProduct[]`
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {GetProductDTO} dto
   * @param {string} [keyword]
   * @return {Promise<ShopProduct[]>}
   * @memberof ProductService
   */
  list(dto: GetProductDTO, keyword?: null | undefined): Promise<ShopProduct[]>;
  /**
   * 获取商品列表
   *
   * @description keyword参数存在，返回元组`[ShopProduct[], number]`，第一个元素为`ShopProduct[]`，第二个元素为`ShopProduct[]`的总数
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param {GetProductDTO} dto
   * @param {string} keyword
   * @return {*}  {Promise<[ShopProduct[], number]>}
   * @memberof ProductService
   */
  list(dto: GetProductDTO, keyword: string): Promise<[ShopProduct[], number]>;
}

@Injectable()
export class ProductService {
  constructor(
    private readonly shopProductRepository: ShopProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async list(dto: GetProductDTO, keyword?: unknown): Promise<ShopProduct[] | [ShopProduct[], number]> {
    if (!Array.isArray(dto.filterTags)) dto.filterTags = [dto.filterTags];
    if (!Array.isArray(dto.filterUser)) dto.filterUser = [dto.filterUser];
    if (!dto.orderTime) dto.orderTime = "latest";
    if (!dto.orderHot) dto.orderHot = "hottest";
    if (!dto.orderPrice) dto.orderPrice = "highest";
    if (!dto.orderSold) dto.orderSold = "highest";
    if (!dto.orderStock) dto.orderStock = "highest";
    if (!dto.take) dto.take = 10;
    if (!dto.skip) dto.skip = 0;

    const entity = await this.shopProductRepository[keyword ? "findAndCount" : "find"]({
      cache: true,
      take: dto.take,
      skip: dto.skip,
      relations: { productTags: true, user: true },
      order: {
        updatedAt: dto.orderTime === "oldest" ? "ASC" : "DESC",
        productView: dto.orderHot === "coldest" ? "ASC" : "DESC",
        productPrice: dto.orderPrice === "lowest" ? "ASC" : "DESC",
        productDiscountPrice: dto.orderPrice === "lowest" ? "ASC" : "DESC",
        productSold: dto.orderSold === "lowest" ? "ASC" : "DESC",
        productStock: dto.orderStock === "lowest" ? "ASC" : "DESC",
      },
      where: (() => {
        const value: FindOptionsWhere<ShopProduct>[] = [];
        for (const userID of dto.filterUser || []) {
          for (const tagID of dto.filterTags || []) {
            value.push({
              productStatus: "up",
              productName: keyword ? Like(`%${keyword}%`) : undefined,
              productIntroduction: keyword ? Like(`%${keyword}%`) : undefined,
              user: { userID },
              productTags: { productTagID: tagID },
            });
          }
        }
        return value;
      })(),
    });

    const list = await Promise.all(
      ((typeof entity[1] === "number" ? entity[0] : entity) as ShopProduct[]).map(async (item) => {
        item.user = await this.userRepository.findOneByControl(item.user.userID, true);
        return item;
      }),
    );

    if (typeof entity[1] === "number") return [list, entity[1]];
    return list;
  }
}
