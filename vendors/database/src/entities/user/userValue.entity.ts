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

  @Column({ comment: "用户余额，单位分", default: 0 })
  balance: number;

  @Column({ comment: "用户积分", default: 0 })
  point: number;

  @Column({ comment: "用户等级", default: 0 })
  level: number;

  @Column({ comment: "用户经验", default: 0 })
  experience: number;

  @OneToOne(() => User, (user) => user.userValue)
  user: User;
}
