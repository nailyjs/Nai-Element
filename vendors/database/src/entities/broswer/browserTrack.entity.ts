import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class BrowserTrack {
  @PrimaryGeneratedColumn("uuid")
  browserTrackID: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.browserTracks)
  user: User;

  @Column({ type: "longtext" })
  webPageTitle: string;

  @Column({ type: "longtext" })
  webPageLink: string;
}
