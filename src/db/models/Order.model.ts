import { Optional } from 'sequelize';
import {
	Table,
	Column,
	Model,
	HasMany,
	UpdatedAt,
	CreatedAt,
	DataType,
	ForeignKey,
	BelongsTo,
	Default,
} from 'sequelize-typescript';
import { User } from './User.model';
import { OrderItem } from './OrderItem.model';

export interface OrderAttributes {
	total_sum: number;
	status?: string;
	id?: number;
	buyer_id?: number;
	salesman_id?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

@Table({ tableName: 'orders' })
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
	public static readonly tableName: string = 'orders';

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER(),
		allowNull: false,
	})
	buyer_id: number;

	@BelongsTo(() => User)
	buyer: User;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER(),
		allowNull: false,
	})
	salesman_id: number;

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
	order_items: OrderItem[];
}
