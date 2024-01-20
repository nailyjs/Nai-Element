import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { UserSubscribeOrder } from "../user/userSubscribeOrder.entity";

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
  author: User;

  @ManyToOne(() => UserSubscribeOrder, (userSubscribeOrder) => userSubscribeOrder.shopSubscribe)
  userSubscribeOrders: UserSubscribeOrder[];
}
