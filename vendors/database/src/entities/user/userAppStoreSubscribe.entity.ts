import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserAppStoreSubscribe {
  @PrimaryGeneratedColumn()
  userAppStoreSubscribeID: number;

  @ManyToOne(() => User, (user) => user.userAppStoreSubscribes)
  user: User;

  @Column({ comment: "原始订单ID", nullable: false, unique: true })
  originalTransactionID: string;
}
