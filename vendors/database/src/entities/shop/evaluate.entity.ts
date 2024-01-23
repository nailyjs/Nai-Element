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

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { ShopProduct } from "./product.entity";
import { ShopEvaluateLike } from "./evaluateLike.entity";

@Entity()
export class ShopEvaluate {
  @PrimaryGeneratedColumn({ comment: "评价ID" })
  evaluateID: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ comment: "评价内容" })
  content: string;

  @ManyToOne(() => User, (user) => user.shopEvaluates)
  user: User;

  @ManyToOne(() => ShopProduct, (product) => product.shopEvaluates)
  product: ShopProduct;

  @OneToMany(() => ShopEvaluateLike, (evaluateLike) => evaluateLike.shopEvaluate)
  shopEvaluateLikes: ShopEvaluateLike[];
}
