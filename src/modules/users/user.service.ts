import { Order } from './../../db/models/Order.model';
import { Op } from 'sequelize';
import { User, UserAttributes } from '../../db/models/User.model';
import {
	normalize,
	normalizeOne,
} from '../../common/helpers/dataNormalization';
import { Forbidden } from '../../common/errors/forbidden';

import { NotFound } from '../../common/errors/notFound';

export enum UserRole {
	Admin = 'admin',
	Salesman = 'salesman',
	Client = 'client',
}

type UserKeyAttributes = keyof UserAttributes;

interface IUserOptionalAttributes {
	[key: string]: string | number;
}

class UserService {

	async getUserInfo(userId) {
		const user: User | null = await User.findOne({
			attributes: [
				'id',
				'login',
				'name',
				'phone',
				'email',
				'balance',
				'createdAt',
			],
			where: { id: userId },
		});
		if (user) return user;
		throw new NotFound('User is not found');
	}

	async getSalesmanIdByLogin(login: string): Promise<number | void> {
		const rawSalesman = await User.findAll({
			attributes: ['id', 'login'],
			where: {
				[Op.and]: [
					{ role: { [Op.or]: [UserRole.Admin, UserRole.Salesman] } },
					{ login: { [Op.iLike]: `%${login.toLowerCase()}%` } },
				],
			},
		});
		if (rawSalesman.length === 0) {
			throw new NotFound(`Salesman with login ${login} doesnt exist`);
		}
		const salesMan = normalize(rawSalesman);
		return salesMan[0].id;
	}

	async getAllUsersByRole(
		role: UserRole | UserRole[],
		attributes: UserKeyAttributes[],
	): Promise<Array<IUserOptionalAttributes>> {
		const attributesArray: string[] = [];
		attributes.forEach((el) => attributesArray.push(el));
		const rawSalesmenData = await User.findAll({
			attributes: attributesArray,
			where: Array.isArray(role) ? { [Op.or]: role } : { role },
		});
		return normalize(rawSalesmenData);
	}
	
	async getOrdersById(id: number) {
		const orders = await Order.findAll({
			attributes: [
				'id',
				'total_sum',
				'status',
				'buyer_id',
				'salesman_id',
				'createdAt',
			],
			where: {
				salesman_id: id,
			},
		});
		return orders;
	}
}

export const userService = new UserService();
