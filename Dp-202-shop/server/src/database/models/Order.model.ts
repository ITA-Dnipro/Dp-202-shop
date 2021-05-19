import { Optional } from 'sequelize';
import {Table, Column, Model, HasMany, UpdatedAt, CreatedAt, DataType, ForeignKey, BelongsTo, Default} from 'sequelize-typescript';
import {Product} from "./Product.model";
import {User} from "./User.model";
import {OrderItem} from "./OrderItem.model";


interface OrderAttributes {
  total_sum: number;
  status?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

@Table({ tableName: 'orders' })
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  public static readonly tableName: string = 'orders';

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  buyer_d: number;
  @BelongsTo(() => User)
  buyer: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  salesman_d: number;
  @BelongsTo(() => User)
  salesman: User;

  @Column({
    type: DataType.REAL(),
    allowNull: false,
  })
  total_sum: number;

  @Default('new')
  @Column({
    type: DataType.ENUM('new', 'in progress', 'done'),
  })
  status: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => OrderItem)
  order_items: OrderItem[]
}

