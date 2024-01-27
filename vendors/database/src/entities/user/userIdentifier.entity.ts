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
import type { LoginType } from "cc.naily.element.auth";

export type ILoginMethod = "QrCode" | "PhoneCode" | "EmailCode" | "UsernamePassword";
export const LoginMethod: ILoginMethod[] = ["QrCode", "PhoneCode", "EmailCode", "UsernamePassword"];

@Entity()
export class UserIdentifier {
  @PrimaryGeneratedColumn({ comment: "用户标识符ID" })
  userIdentifierID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ comment: "登录设备类型", nullable: false, type: "varchar" })
  loginType: LoginType;

  @Column({ comment: "登录的客户端", nullable: true, type: "varchar" })
  loginClient: string;

  @Column({ comment: "登录的IP", nullable: true, type: "varchar" })
  loginIP: string;

  @Column({ comment: "登录的渠道", nullable: false, type: "varchar" })
  loginMethod: ILoginMethod;

  @Column({ comment: "登录标识符 整个系统该登录类型/设备/渠道的唯一标识符 Web端可为空", nullable: true })
  identifier: string;

  @ManyToOne(() => User, (user) => user.userIdentifiers)
  user: Relation<User>;
}
