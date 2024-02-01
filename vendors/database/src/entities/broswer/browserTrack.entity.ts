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

  @Column()
  webPageTitle: string;

  @Column()
  webPageLink: string;
}
