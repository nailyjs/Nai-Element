import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ShopProduct } from "./product.entity";

@Entity()
export class ShopProductTag {
  @PrimaryGeneratedColumn()
  productTagID: number;

  @CreateDateColumn({ comment: "创建时间" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "更新时间" })
  updatedAt: Date;

  @ManyToMany(() => ShopProduct, (product) => product.productTags)
  products: ShopProduct[];

  @Column({ comment: "标签名称" })
  productTagName: string;

  @Column({ comment: "标签描述" })
  productTagIntroduction: string;
}
