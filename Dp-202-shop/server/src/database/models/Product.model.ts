import {Optional, default as Sequelize} from 'sequelize';
import {Table, Column, Model, HasMany, UpdatedAt, CreatedAt, DataType, ForeignKey, BelongsTo, Default} from 'sequelize-typescript';
import {Unit} from "./Unit.model";
import {User} from "./User.model";
import {Category} from "./Category.model";
import {Manufacture} from "./Manufacture.model";
import {OrderItem} from "./OrderItem.model";


interface ProductAttributes {
  vendor_code: number;
  product_name: string;
  amount: string;
  price: number;
  id?: number;
  deleted?: boolean;
  ingredients?: string;
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {
}

// @ts-ignore
@Table({tableName: 'products'})
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public static readonly tableName: string = 'products';

  @ForeignKey(() => Unit)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  unit_d: number;
  @BelongsTo(() => Unit)
  unit: Unit;

  @ForeignKey(() => Manufacture)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  manufacture_d: number;
  @BelongsTo(() => Manufacture)
  manufacture: Manufacture;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  category_d: number;
  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  user_d: number;
  @BelongsTo(() => User)
  user: User;

  @Column({
    type: Sequelize.INTEGER,
  })
  vendor_code: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: Sequelize.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: Sequelize.REAL,
    allowNull: false,
  })
  price: number;

  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  ingredients: string;

  @Column({
    type: Sequelize.TEXT,
  })
  img: string;

  @Default(false)
  @Column({
    type: Sequelize.BOOLEAN,
  })
  deleted: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];
}
