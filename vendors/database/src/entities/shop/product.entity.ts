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

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Tag } from "../tag.entity";
import { ShopProductProperties } from "./productProperties.entity";
import { User } from "../user/user.entity";
import { ShopEvaluate } from "./evaluate.entity";

@Entity()
export class ShopProduct {
  @PrimaryGeneratedColumn("uuid", { comment: "商品ID" })
  productID: string;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ comment: "商品名称", nullable: false })
  productName: string;

  @Column({ comment: "商品描述", nullable: true })
  productIntroduction: string;

  @Column({ comment: "商品金额 单位分", nullable: false })
  productPrice: number;

  @Column({ comment: "商品折扣价 单位分", nullable: true })
  productDiscountPrice: number;

  @Column({ comment: "库存数量", default: 0 })
  productStock: number;

  @Column({ comment: "已售数量", default: 0 })
  productSold: number;

  @Column({ comment: "商品浏览量", default: 0 })
  productView: number;

  @Column({ comment: "商品状态", default: "up" })
  productStatus: "up" | "down";

  @ManyToOne(() => User, (user) => user.userProducts)
  user: Relation<User>;

  @ManyToMany(() => Tag, (productTag) => productTag.products)
  @JoinTable()
  productTags: Relation<Tag[]>;

  @OneToMany(() => ShopProductProperties, (productProperties) => productProperties.product)
  productProperties: Relation<ShopProductProperties[]>;

  @OneToMany(() => ShopEvaluate, (evaluate) => evaluate.product)
  shopEvaluates: Relation<ShopEvaluate[]>;
}
