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

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  userDataID: number;

  @ManyToOne(() => User, (user) => user.userDatas)
  user: User;

  @Column({ comment: "命名空间", nullable: false })
  namespace: string;

  @Column({ comment: "键", nullable: false })
  key: string;

  @Column({ comment: "值", nullable: true })
  value: string;
}
