import { Op } from 'sequelize';
import { Manufacture } from '../../db/models/Manufacture.model';
import { Category } from '../../db/models/Category.model';
import {
	normalize,
	normalizeOne,
	delExtra,
	deleteKeys,
} from '../../common/helpers/dataNormalization';
import { Unit } from '../../db/models/Unit.model';
import { User } from '../../db/models/User.model';
import { Product, ProductAttributes } from '../../db/models/Product.model';
import { userService } from '../users/user.service';
import { NotFoundData } from '../../common/errors/notFoundData';
import sequelize from '../../db/config/db';
import { NotFound } from '../../common/errors/notFound';
import { IProduct as IProductFromBody } from '../../common/dtos/new.product.dto';
import { IProductsArray } from '../../common/dtos/orders.dto';
import {
	ISearchParams,
	IWhereQuery,
} from '../../common/dtos/search.params.dto';

import { BaseError } from '../../common/errors/baseError';

interface IBasicProduct extends ProductAttributes {
	category_id: number;
	manufacture_id: number;
	unit_id: number;
	user_id: number | void;
}

type allowedTables = 'categories' | 'manufactures' | 'units';

export interface IProduct extends IProductFromBody {
	id: number;
}

export type IFoundProductsArray = Array<{
	id: number;
	amount: number;
}>;

export interface IDbData {
	id: number;
	category?: string;
	manufacture?: string;
	units?: string;
}

export class ProductsService {
	async retrieveIdAmount(
		products: IProductsArray,
	): Promise<IFoundProductsArray> {
		const ids: number[] = products.map((el) => el.id);
		const rawProducts = await Product.findAll({
			attributes: ['id', 'amount'],
			where: {
				id: {
					[Op.in]: ids,
				},
			},
		});
		return normalize(rawProducts);
	}

	async checkIdExists(
		products: IProductsArray,
		foundProducts: IFoundProductsArray,
	): Promise<Array<{ id: number }>> {
		const foundIds: number[] = foundProducts.map((product) => product.id);
		const idNotExist = products
			.filter((product) => {
				return !foundIds.includes(product.id);
			})
			.map((el) => {
				return { id: el.id };
			});
		return idNotExist;
	}

	async checkAvailability(
		products: IProductsArray,
		foundProducts: IFoundProductsArray,
	): Promise<any> {
		return foundProducts.filter((el) => {
			const item = products.find((val) => {
				return val.id === el.id;
			});
			if (item.count > el.amount) {
				return el;
			}
		});
	}

	async getTableData(tableName: allowedTables): Promise<void | Array<IDbData>> {
		let tableColumn: string | string[];
		let tableModel: any;
		switch (tableName) {
			case 'categories':
				tableColumn = 'category';
				tableModel = Category;
				break;
			case 'manufactures':
				tableColumn = 'manufacture';
				tableModel = Manufacture;
				break;
			case 'units':
				tableColumn = 'unit';
				tableModel = Unit;
				break;
			default:
				break;
		}
		const rawTableData = await tableModel.findAll({
			attributes: ['id', tableColumn],
		});
		if (rawTableData.length === 0)
			throw new NotFound(`${tableName} are not found`);
		const tableData = normalize(rawTableData);
		return tableData;
	}

	async getOrCreateRow(
		field: string,
		tableName: string,
		t?: any,
	): Promise<number> {
		let tableModel: any;
		let columnName: string;
		switch (field) {
			case 'category_id':
				tableModel = Category;
				columnName = 'category';
				break;
			case 'manufacture_id':
				tableModel = Manufacture;
				columnName = 'manufacture';
				break;
			case 'unit_id':
				tableModel = Unit;
				columnName = 'unit';
				break;
			default:
				break;
		}
		const data: any[] = await tableModel.findAll({
			attributes: ['id', columnName],
			where: { [columnName]: { [Op.iLike]: `%${tableName.toLowerCase()}%` } },
		});

		if (data.length === 0) {
			const newData = await tableModel.create(
				{ [columnName]: tableName },
				{ transaction: t },
			);
			return normalizeOne(newData).id;
		}
		return normalize(data)[0].id;
	}

	async replaceDataWithForeignKeys(
		product: IProductFromBody,
		t?: any,
	): Promise<any> {
		const productObj: Partial<IBasicProduct> = {};
		const notForeignKeys = [
			'product_name',
			'amount',
			'deleted',
			'price',
			'ingredients',
			'img',
			'vendor_code',
		];
		notForeignKeys.forEach((key) => {
			if (product[`${key}`] || typeof product[`${key}`] === 'boolean') {
				productObj[`${key}`] = product[`${key}`];
			} else {
				productObj[`${key}`] = null;
			}
		});
		const valuesToFind: Array<{ [key: string]: string }> = [
			{ value: product.category, field: 'category_id' },
			{ value: product.manufacture, field: 'manufacture_id' },
			{ value: product.unit, field: 'unit_id' },
		];
		for (let i = 0; i < valuesToFind.length; i++) {
			productObj[`${valuesToFind[i].field}`] = await this.getOrCreateRow(
				valuesToFind[i].field,
				valuesToFind[i].value,
				t,
			);
		}
		productObj.user_id = await userService.getSalesmanIdByLogin(
			product.salesman_login,
		);

		return productObj;
	}

	async addNewProduct(
		product: IProductFromBody,
	): Promise<Array<ProductAttributes>> {
		const result = await sequelize.transaction(async (t) => {
			const productForDB = await this.replaceDataWithForeignKeys(product, t);
			const rawNewProduct = await Product.create(productForDB, {
				transaction: t,
			});
			return [normalizeOne(rawNewProduct)];
		});
		return result;
	}

	async checkIdExist(id: number): Promise<boolean> {
		const foundProduct = await Product.findOne({ where: { id } });
		return Boolean(foundProduct);
	}

	async updateProduct(
		id: number,
		productData: IProductFromBody,
	): Promise<Array<ProductAttributes> | void> {
		const idExist = await this.idIsExist(id, true);
		if (!idExist) {
			throw new NotFoundData([{ id }], 'This product doesnt exist');
		}
		const result = await sequelize.transaction(async (t) => {
			const productForDB = await this.replaceDataWithForeignKeys(
				productData,
				t,
			);
			const updatedProduct = await Product.update(productForDB, {
				returning: true,
				where: { id },
			});
			return [normalizeOne(updatedProduct[1][0])];
		});
		return result;
	}

	async deleteProduct(idProduct: number, idSalesman?: number) {
		const idExist = await this.idIsExist(idProduct, true, idSalesman);
		if (!idExist)
			throw new NotFoundData([{ idProduct }], 'This product doesnt exist');
		const idDeleted = await this.idIsExist(idProduct, false, idSalesman);
		if (!idDeleted)
			throw new NotFoundData([{ idProduct }], 'This id is already deleted');
		const deletedProduct = await Product.update(
			{ deleted: true },
			{
				where: {
					id: idProduct,
					user_id:
						typeof idSalesman === 'number'
							? idSalesman
							: { [Op.col]: 'user_id' },
				},
				returning: true,
			},
		);
		return [normalizeOne(deletedProduct[1][0])];
	}

	async getAllProducts(): Promise<Array<IProductFromBody>> {
		const dbRes = await Product.findAll({
			where: {
				deleted: 'false',
			},
			attributes: [
				'id',
				'vendor_code',
				'product_name',
				'amount',
				'price',
				'img',
			],
			include: [
				{
					model: Category,
					attributes: ['category'],
				},
				{
					model: Manufacture,
					attributes: ['manufacture'],
				},
				{
					model: Unit,
					attributes: ['unit'],
				},
				{
					model: User,
					attributes: ['login'],
				},
			],
		});

		const rawProducts = normalize(dbRes, [
			{ category: ['category'] },
			{ unit: ['unit'] },
			{ manufacture: ['manufacture'] },
			{ user: ['login'] },
		]);
		return delExtra(rawProducts, ['user']);
	}

	async getOneProductById(
		id: number,
		showDeleted: boolean,
	): Promise<IProductFromBody> {
		const isExist = await this.idIsExist(id, showDeleted);
		if (!isExist) {
			throw new NotFoundData([{ id }], "This product doesn't exist");
		} else {
			const dbRes = await Product.findOne({
				where: {
					id,
					deleted: showDeleted ? { [Op.or]: [true, false] } : showDeleted,
				},
				attributes: [
					'id',
					'vendor_code',
					'product_name',
					'amount',
					'price',
					'img',
					'ingredients',
				],
				include: [
					{
						model: Category,
						attributes: ['category'],
					},
					{
						model: Manufacture,
						attributes: ['manufacture'],
					},
					{
						model: Unit,
						attributes: ['unit'],
					},
					{
						model: User,
						attributes: ['login'],
					},
				],
			});

			const rawProduct = normalizeOne(dbRes, [
				{ category: ['category'] },
				{ unit: ['unit'] },
				{ user: ['login'] },
				{ manufacture: ['manufacture'] },
			]);
			return deleteKeys(rawProduct, ['user']);
		}
	}

	async getAllProductsExtended(
		salesmanId?: number,
	): Promise<Array<IProductFromBody>> {
		const dbRes = await Product.findAll({
			where: {
				user_id:
					typeof salesmanId == 'number' ? salesmanId : { [Op.col]: 'user_id' },
			},
			attributes: {
				exclude: ['unit_id', 'manufacture_id', 'category_id', 'user_id'],
			},
			include: [
				{
					model: Category,
					attributes: ['category'],
				},
				{
					model: Manufacture,
					attributes: ['manufacture'],
				},
				{
					model: Unit,
					attributes: ['unit'],
				},
				{
					model: User,
					attributes: ['login'],
				},
			],
		});

		const rawProducts = normalize(dbRes, [
			{ category: ['category'] },
			{ unit: ['unit'] },
			{ user: ['name'] },
			{ manufacture: ['manufacture'] },
			{ user: ['login'] },
		]);
		return delExtra(rawProducts, ['user']);
	}

	async idIsExist(
		id: number,
		showDeleted: boolean,
		salesmanId?: number,
	): Promise<boolean> {
		const dbRes = await Product.findOne({
			where: {
				id,
				deleted: showDeleted ? { [Op.or]: [true, false] } : showDeleted,
				user_id:
					typeof salesmanId === 'number' ? salesmanId : { [Op.col]: 'user_id' },
			},
		});
		return Boolean(dbRes);
	}

	createOrderQuery(orderParam: ISearchParams) {
		const orderQuery = [];

		if (Object.keys(orderParam).length === 0) {
			orderQuery.push(['id', 'ASC']);
			return orderQuery;
		}

		const { id, price } = orderParam;

		if (id === 'desc') {
			orderQuery.push(['id', 'DESC']);
		}

		if (id === 'ASC') {
			orderQuery.push(['id', 'ASC']);
		}

		if (price === 'desc') {
			orderQuery.push(['price', 'DESC']);
		}

		if (price === 'asc') {
			orderQuery.push(['price', 'ASC']);
		}

		return orderQuery;
	}

	createWhereQuery(whereParam: ISearchParams): IWhereQuery {
		const whereQuery: IWhereQuery = {
			deleted: false,
		};

		if (Object.keys(whereParam).length === 0) {
			return whereQuery;
		}

		const { categories, manufactures, products, status } = whereParam;

		whereQuery.category_id =
			categories === undefined
				? { [Op.col]: 'category_id' }
				: { [Op.in]: categories.split(',') };
		whereQuery.product_name =
			products === undefined
				? { [Op.col]: 'product_name' }
				: { [Op.iLike]: `%${products}%` };
		whereQuery['$manufacture$'] =
			manufactures === undefined
				? { [Op.col]: 'manufacture' }
				: { [Op.iLike]: `%${manufactures}%` };

		if (status === 'all') {
			whereQuery.deleted = { [Op.or]: [true, false] };
		}

		if (status === 'deleted') {
			whereQuery.deleted = true;
		}

		return whereQuery;
	}

	async getList(queryParam: ISearchParams): Promise<Array<IProductFromBody>> {
		const whereQuery = this.createWhereQuery(queryParam);
		const orderQuery = this.createOrderQuery(queryParam);

		const dbRes = await Product.findAll({
			where: whereQuery,
			order: orderQuery,
			attributes: [
				'id',
				'vendor_code',
				'product_name',
				'amount',
				'price',
				'img',
				'ingredients',
			],
			include: [
				{
					model: Category,
					attributes: ['category'],
				},
				{
					model: Manufacture,
					attributes: ['manufacture'],
				},
				{
					model: Unit,
					attributes: ['unit'],
				},
				{
					model: User,
					attributes: ['login'],
				},
			],
		});

		if (dbRes.length === 0) {
			throw new BaseError(200, 'There are no products for your request.');
		}

		const rawProducts = normalize(dbRes, [
			{ category: ['category'] },
			{ unit: ['unit'] },
			{ manufacture: ['manufacture'] },
			{ user: ['login'] },
		]);
		return delExtra(rawProducts, ['user']);
	}

	async getOneProductByIdExtended(id: number) {
		const dbRes = await Product.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ['unit_id', 'manufacture_id', 'category_id', 'user_id'],
			},
			include: [
				{
					model: Category,
					attributes: ['category'],
				},
				{
					model: Manufacture,
					attributes: ['manufacture'],
				},
				{
					model: Unit,
					attributes: ['unit'],
				},
				{
					model: User,
					attributes: ['login'],
				},
			],
		});

		const rawProduct = normalizeOne(dbRes, [
			{ category: ['category'] },
			{ unit: ['unit'] },
			{ user: ['login'] },
			{ manufacture: ['manufacture'] },
		]);
		return deleteKeys(rawProduct, ['user']);
	}
}

export const productsService = new ProductsService();
