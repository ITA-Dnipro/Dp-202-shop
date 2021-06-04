import { Optional } from 'sequelize';
import {
	Table,
	Column,
	Model,
	HasMany,
	UpdatedAt,
	CreatedAt,
	DataType,
	Default,
	Unique,
} from 'sequelize-typescript';
import { Product } from './Product.model';
import { Order } from './Order.model';

export interface UserAttributes {
	login: string;
	password: string;
	email: string;
	balance: number;
	id?: number;
	name?: string;
	phone?: string;
	role?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
	public static readonly tableName: string = 'users';

	@Unique(true)
	@Column({
		type: DataType.STRING(),
		allowNull: false,
	})
	login: string;

	@Column({
		type: DataType.STRING(),
		allowNull: false,
	})
	password: string;

	@Column({
		type: DataType.STRING(),
		allowNull: false,
	})
	email: string;

	@Column({
		type: DataType.REAL(),
		allowNull: false,
	})
	balance: number;

	@Column
	name: string;

	@Column
	phone: string;

	@Default('client')
	@Column({
		type: DataType.ENUM('client', 'salesman', 'admin', 'pending', 'rejected'),
	})
	role: string;

	@CreatedAt
	createdAt: Date;

	@UpdatedAt
	updatedAt: Date;

	@HasMany(() => Product)
	products: Product[];

	@HasMany(() => Order)
	sellers: Order[];

	@HasMany(() => Order)
	buyers: Order[];
}
