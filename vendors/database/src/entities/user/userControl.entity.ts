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

  @OneToOne(() => User, (user) => user.userControl)
  user: User;

  @Column({ comment: "是否公开邮箱" })
  publicEmail: boolean;

  @Column({ comment: "是否公开手机号" })
  publicPhone: boolean;
}
