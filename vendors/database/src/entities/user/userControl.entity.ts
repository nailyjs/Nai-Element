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

import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserControl {
  @PrimaryGeneratedColumn({ comment: "用户权限ID" })
  userControlID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userControls)
  user: User;

  @Column({ comment: "是否公开邮箱" })
  publicEmail: boolean;

  @Column({ comment: "是否公开手机号" })
  publicPhone: boolean;

  @Column({ comment: "是否公开商品评论点赞" })
  publicEvaluateLike: boolean;
}
