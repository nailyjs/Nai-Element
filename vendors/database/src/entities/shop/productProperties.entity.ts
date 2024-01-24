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

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ShopProduct } from "./product.entity";

@Entity()
export class ShopProductProperties {
  @PrimaryGeneratedColumn({ comment: "商品属性ID" })
  productPropertiesID: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ShopProduct, (product) => product.productProperties)
  product: Relation<ShopProduct>;

  @Column({ comment: "商品属性名称", nullable: false })
  productPropertiesName: string;

  @Column({ comment: "商品属性描述", nullable: false })
  productPropertiesIntroduction: string;
}
