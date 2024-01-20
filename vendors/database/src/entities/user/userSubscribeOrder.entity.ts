import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
  shopSubscribe: ShopSubscribe;

  @ManyToOne(() => User, (user) => user.userSubscribeOrders)
  user: User;
}
