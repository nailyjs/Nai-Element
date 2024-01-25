import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import type { LoginType } from "cc.naily.element.auth";

@Entity()
export class UserIdentifier {
  @PrimaryGeneratedColumn({ comment: "用户标识符ID" })
  userIdentifierID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @Column({ comment: "登录类型", nullable: false, type: "varchar" })
  loginType: LoginType;

  @Column({ comment: "登录的客户端", nullable: true, type: "varchar" })
  loginClient: string;

  @Column({ comment: "登录标识符 整个系统该登录类型的唯一标识符", nullable: true })
  identifier: string;

  @ManyToOne(() => User, (user) => user.userIdentifiers)
  user: Relation<User>;
}
