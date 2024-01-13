import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  @ManyToOne(() => User, (user) => user.userOrder)
  user: User;

  @Column({ nullable: false, comment: "金额" })
  amount: number;

  @Column({ nullable: false, comment: "支付方式" })
  method: "xunhupayWechat" | "xunhupayAlipay" | "wechat" | "alipay";

  @Column({ nullable: false, comment: "状态" })
  status: "pending" | "success";

  @Column({ nullable: true, comment: "备注" })
  remark: string;
}
