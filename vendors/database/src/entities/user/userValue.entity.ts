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
export class UserValue {
  @PrimaryGeneratedColumn({ comment: "userPayID" })
  userPayID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ comment: "用户余额 单位分", default: 0 })
  balance: number;

  @Column({ comment: "用户积分", default: 0 })
  point: number;

  @Column({ comment: "用户等级", default: 0 })
  level: number;

  @Column({ comment: "用户经验", default: 0 })
  experience: number;

  @OneToOne(() => User, (user) => user.userValues)
  user: User;
}
