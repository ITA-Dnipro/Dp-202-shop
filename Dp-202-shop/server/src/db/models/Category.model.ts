import {Optional} from 'sequelize';
import {Table, Column, Model, HasMany, UpdatedAt, CreatedAt, Unique} from 'sequelize-typescript';
import {Product} from "./Product.model";


interface CategoryAttributes {
  id?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {
}

@Table({tableName: 'categories'})
export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  public static readonly tableName: string = 'categories';

  @Unique(true)
  @Column
  category: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Product)
  products: Product[];
}
