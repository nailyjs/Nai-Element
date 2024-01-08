import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserValue } from "./userValue.entity";
import { UserControl } from "./userControl.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: "用户ID" })
  userID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ unique: true, comment: "用户名", nullable: false })
  username: string;

  @Column({ comment: "密码", nullable: false })
  password: string;

  @Column({ comment: "IP" })
  ip: string;

  @Column({ comment: "个性签名", default: "这个人很懒，什么都没有写哦" })
  saying: string;

  @Column({ comment: "头像" })
  avatar: string;

  @Column({ comment: "电子邮件地址" })
  email: string;

  @Column({ comment: "手机号码" })
  phone: string;

  @OneToOne(() => UserValue, (userValue) => userValue.user)
  @JoinColumn()
  userValue: UserValue;

  @OneToOne(() => UserControl, (userControl) => userControl.user)
  @JoinColumn()
  userControl: UserControl;
}
