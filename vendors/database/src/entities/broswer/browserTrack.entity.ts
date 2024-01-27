import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class BrowserTrack {
  @PrimaryGeneratedColumn()
  browserTrackID: number;

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
