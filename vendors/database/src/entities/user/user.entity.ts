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

import { Column, Relation, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserValue } from "./userValue.entity";
import { UserControl } from "./userControl.entity";
import { UserOrder } from "./userOrder.entity";
import { ShopProduct } from "../shop/product.entity";
import { UserSubscribeOrder } from "./userSubscribeOrder.entity";
import { ShopSubscribe } from "../shop/subscribe.entity";
import { ShopEvaluate } from "../shop/evaluate.entity";
import { ShopEvaluateLike } from "../shop/evaluateLike.entity";
import { UserIdentifier } from "./userIdentifier.entity";
import { UserData } from "./userData.entity";
import { UserAppStoreSubscribe } from "./userAppStoreSubscribe.entity";
import { BrowserTrack } from "../broswer/browserTrack.entity";
import { BrowserBookMark } from "../broswer/bookMark.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid", { comment: "用户ID" })
  userID: string;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ unique: true, comment: "用户名", nullable: false })
  username: string;

  @Column({ comment: "密码", nullable: true })
  password: string;

  @Column({ comment: "IP", nullable: true })
  ip: string;

  @Column({ comment: "个性签名", nullable: true, default: "这个人很懒，什么都没有写哦" })
  saying: string;

  @Column({ comment: "头像", nullable: true })
  avatar: string;

  @Column({ comment: "电子邮件地址", nullable: true })
  email: string;

  @Column({ comment: "手机号", nullable: true })
  phone: string;

  @Column({ comment: "是否已注销状态", nullable: false, default: false })
  isDeleted: boolean;

  @OneToOne(() => UserValue, (userValue) => userValue.user)
  @JoinColumn()
  userValues: Relation<UserValue>;

  @OneToOne(() => UserControl, (userControl) => userControl.user)
  @JoinColumn()
  userControls: Relation<UserControl>;

  @OneToMany(() => UserOrder, (userOrder) => userOrder.user)
  @JoinColumn()
  userOrders: Relation<UserOrder[]>;

  @OneToMany(() => ShopProduct, (product) => product.user)
  @JoinColumn()
  userProducts: Relation<ShopProduct[]>;

  @OneToMany(() => ShopSubscribe, (subscribe) => subscribe.author)
  @JoinColumn()
  userSubscribes: Relation<ShopSubscribe[]>;

  @OneToMany(() => ShopEvaluate, (evaluate) => evaluate.user)
  @JoinColumn()
  shopEvaluates: Relation<ShopEvaluate[]>;

  @OneToMany(() => ShopEvaluateLike, (evaluateLike) => evaluateLike.user)
  @JoinColumn()
  shopEvaluateLikes: Relation<ShopEvaluateLike[]>;

  @OneToMany(() => UserSubscribeOrder, (userSubscribeOrder) => userSubscribeOrder.user)
  @JoinColumn()
  userSubscribeOrders: Relation<UserSubscribeOrder[]>;

  @OneToMany(() => UserIdentifier, (userIdentifier) => userIdentifier.user)
  @JoinColumn()
  userIdentifiers: Relation<UserIdentifier[]>;

  @OneToMany(() => UserData, (userIdentifier) => userIdentifier.user)
  @JoinColumn()
  userDatas: Relation<UserData[]>;

  @OneToMany(() => UserAppStoreSubscribe, (userAppStoreSubscribes) => userAppStoreSubscribes.user)
  @JoinColumn()
  userAppStoreSubscribes: Relation<UserAppStoreSubscribe[]>;

  @OneToMany(() => BrowserTrack, (browserTrack) => browserTrack.user)
  @JoinColumn()
  browserTracks: Relation<BrowserTrack[]>;

  @OneToMany(() => BrowserBookMark, (browserTrack) => browserTrack.user)
  @JoinColumn()
  browserBookMarks: Relation<BrowserTrack[]>;
}
