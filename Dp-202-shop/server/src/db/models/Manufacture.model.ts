import { Optional } from 'sequelize';
import {Table, Column, Model, HasMany, UpdatedAt, CreatedAt, Unique} from 'sequelize-typescript';
import {Product} from "./Product.model";


interface ManufactureAttributes {
  manufacture: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ManufactureCreationAttributes extends Optional<ManufactureAttributes, 'id'> {}

@Table({ tableName: 'manufactures' })
export class Manufacture extends Model<ManufactureAttributes, ManufactureCreationAttributes> {
  public static readonly tableName: string = 'manufactures';

  @Unique(true)
  @Column
  manufacture: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Product)
  products: Product[];
}
