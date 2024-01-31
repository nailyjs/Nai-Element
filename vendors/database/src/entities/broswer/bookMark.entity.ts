import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class BrowserBookMark {
  @PrimaryGeneratedColumn("uuid")
  browserBookMarkID: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.browserBookMarks)
  user: User;

  @Column({ comment: "书签index", nullable: false })
  bookMarkIndex: number;

  @Column({ comment: "书签标题", nullable: false })
  bookMarkTitle: string;

  @Column({ comment: "书签的icon", nullable: false })
  bookMarkIcon: string;

  @Column({ comment: "书签的颜色的HEX值", nullable: false })
  bookMarkColor: string;

  @Column({ comment: "书签的链接", nullable: false })
  bookMarkLink: string;
}
