import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserData {
  @PrimaryGeneratedColumn()
  userDataID: number;

  @ManyToOne(() => User, (user) => user.userDatas)
  user: User;

  @Column({ comment: "键" })
  key: string;

  @Column({ comment: "值" })
  value: string;
}
