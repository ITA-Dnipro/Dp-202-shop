import { Optional } from 'sequelize';
import {
	Table,
	Column,
	Model,
	HasMany,
	UpdatedAt,
	CreatedAt,
	Unique,
} from 'sequelize-typescript';
import { Product } from './Product.model';

export interface UnitAttributes {
	unit: string;
	unit_name: string;
	measure: number;
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

type UnitCreationAttributes = Optional<UnitAttributes, 'id'>;

@Table({ tableName: 'units' })
export class Unit extends Model<UnitAttributes, UnitCreationAttributes> {
	public static readonly tableName: string = 'units';

	@Unique(true)
	@Column
	unit: string;

	@Column
	unit_name: string;

	@Column
	measure: number;

	@CreatedAt
	createdAt: Date;

	@UpdatedAt
	updatedAt: Date;

	@HasMany(() => Product)
	products: Product[];
}
