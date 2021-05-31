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

export interface CategoryAttributes {
	id?: number;
	category: string;
	createdAt?: Date;
	updatedAt?: Date;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

@Table({ tableName: 'categories' })
export class Category extends Model<
	CategoryAttributes,
	CategoryCreationAttributes
> {
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
