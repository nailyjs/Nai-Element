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

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { ShopSubscribe } from "../shop/subscribe.entity";

@Entity()
export class UserSubscribeOrder {
  @PrimaryGeneratedColumn()
  userSubscribeID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ comment: "订阅开始时间/上次订阅续期时间" })
  subscribedAt: Date;

  @Column({ comment: "订阅结束时间" })
  expiredAt: Date;

  @Column({ comment: "订阅状态", nullable: false })
  status: "active" | "expired";

  @ManyToOne(() => ShopSubscribe, (shopSubscribe) => shopSubscribe.userSubscribeOrders)
  @JoinColumn()
  shopSubscribe: Relation<ShopSubscribe>;

  @ManyToOne(() => User, (user) => user.userSubscribeOrders)
  user: Relation<User>;
}
