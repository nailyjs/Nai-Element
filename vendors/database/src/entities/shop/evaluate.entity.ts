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
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
  Relation,
} from "typeorm";
import { User } from "../user/user.entity";
import { ShopProduct } from "./product.entity";
import { ShopEvaluateLike } from "./evaluateLike.entity";

@Entity()
@Tree("closure-table")
export class ShopEvaluate {
  @PrimaryGeneratedColumn("uuid", { comment: "评价ID" })
  evaluateID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ comment: "评价内容", nullable: false, type: "longtext" })
  content: string;

  @Column({ comment: "评论点赞数", default: 0 })
  likeCount: number;

  @TreeChildren()
  children: ShopEvaluate[];

  @TreeParent()
  parent: ShopEvaluate;

  @ManyToOne(() => User, (user) => user.shopEvaluates)
  user: Relation<User>;

  @ManyToOne(() => ShopProduct, (product) => product.shopEvaluates)
  product: Relation<ShopProduct>;

  @OneToMany(() => ShopEvaluateLike, (evaluateLike) => evaluateLike.shopEvaluate)
  shopEvaluateLikes: Relation<ShopEvaluateLike[]>;
}
