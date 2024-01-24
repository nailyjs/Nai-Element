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
import { User } from "./user.entity";

@Entity()
export class UserOrder {
  @PrimaryGeneratedColumn({ comment: "订单序号" })
  userOrderID: number;

  @Column({ nullable: false, comment: "交易订单号" })
  tradeOrderID: string;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userOrders)
  user: Relation<User>;

  @Column({ nullable: false, comment: "金额" })
  amount: number;

  @Column({ nullable: false, comment: "支付方式" })
  method: "xunhupayWechat" | "xunhupayAlipay" | "wechat" | "alipay";

  @Column({ nullable: false, comment: "状态" })
  status: "pending" | "success";

  @Column({ nullable: true, comment: "备注" })
  remark: string;
}
