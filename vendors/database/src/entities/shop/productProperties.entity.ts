import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ShopProduct } from "./product.entity";

@Entity()
export class ShopProductProperties {
  @PrimaryGeneratedColumn({ comment: "商品属性ID" })
  productPropertiesID: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ShopProduct, (product) => product.productProperties)
  product: ShopProduct;

  @Column({ comment: "商品属性名称", nullable: false })
  productPropertiesName: string;

  @Column({ comment: "商品属性描述", nullable: false })
  productPropertiesIntroduction: string;
}
