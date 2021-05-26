import { Optional } from 'sequelize';
import {Table, Column, Model, UpdatedAt, CreatedAt, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Product} from "./Product.model";
import {Order} from "./Order.model";


export interface OrderItemAttributes {
  quantity: number;
  id?: number;
  order_id?: number;
  product_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> {
  public static readonly tableName: string = 'order_items';

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  order_id: number;
  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  quantity: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}


