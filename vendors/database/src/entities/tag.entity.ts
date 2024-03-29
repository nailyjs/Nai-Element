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

import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ShopProduct } from "./shop/product.entity";
import { ShopSubscribe } from "./shop/subscribe.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  tagID: string;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @ManyToMany(() => ShopProduct, (product) => product.productTags)
  products: Relation<ShopProduct[]>;

  @ManyToMany(() => ShopSubscribe, (subscribe) => subscribe.subscribeTags)
  subscribes: Relation<ShopSubscribe[]>;

  @Column({ comment: "标签名称" })
  tagName: string;

  @Column({ comment: "标签描述" })
  tagIntroduction: string;
}
