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

import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { UserSubscribeOrder } from "../user/userSubscribeOrder.entity";
import { Tag } from "../tag.entity";

@Entity()
export class ShopSubscribe {
  @PrimaryGeneratedColumn()
  subscribeID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ comment: "订阅价格 单位分", nullable: false })
  price: number;

  @Column({ comment: "订阅内容标题", nullable: false })
  title: string;

  @Column({ comment: "订阅介绍", nullable: false })
  introduction: string;

  @Column({ comment: "订阅时长 单位/天", nullable: false })
  duration: number;

  @ManyToOne(() => User, (user) => user.userSubscribes)
  author: Relation<User>;

  @ManyToOne(() => UserSubscribeOrder, (userSubscribeOrder) => userSubscribeOrder.shopSubscribe)
  userSubscribeOrders: UserSubscribeOrder[];

  @ManyToMany(() => Tag, (tag) => tag.subscribes)
  subscribeTags: Relation<Tag[]>;
}
