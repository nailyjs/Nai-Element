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

  @Column({ comment: "用户余额" })
  balance: number;

  @Column({ comment: "用户积分" })
  point: number;

  @Column({ comment: "用户等级" })
  level: number;

  @Column({ comment: "用户经验" })
  experience: number;

  @OneToOne(() => User, (user) => user.userValue)
  user: User;
}
