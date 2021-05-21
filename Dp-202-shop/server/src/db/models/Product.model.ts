import {Optional} from 'sequelize';
import {Table, Column, Model, HasMany, UpdatedAt, CreatedAt, DataType, ForeignKey, BelongsTo, Default} from 'sequelize-typescript';
import {Unit} from "./Unit.model";
import {User} from "./User.model";
import {Category} from "./Category.model";
import {Manufacture} from "./Manufacture.model";
import {OrderItem} from "./OrderItem.model";


export interface ProductAttributes {
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

@Table({tableName: 'products'})
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public static readonly tableName: string = 'products';

  @ForeignKey(() => Unit)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  unit_id: number;
  @BelongsTo(() => Unit)
  unit: Unit;

  @ForeignKey(() => Manufacture)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  manufacture_id: number;
  @BelongsTo(() => Manufacture)
  manufacture: Manufacture;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  user_id: number;
  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER(),
  })
  vendor_code: number;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.REAL(),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT(),
    allowNull: true,
  })
  ingredients: string;

  @Column({
    type: DataType.TEXT(),
  })
  img: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  deleted: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => OrderItem)
  order_items: OrderItem[];
}
