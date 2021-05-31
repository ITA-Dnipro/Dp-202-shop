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
	async checkUserExistByPhone(phone) {
		const foundUser = await this.findUserByPhone(phone);
		return Boolean(foundUser.length);
	}

	async findUserByPhone(phoneNum) {
		const rawUser = await User.findAll({
			attributes: ['id', 'user_name', 'phone', 'password', 'email'],
			where: {
				phone: phoneNum,
			},
		});
		return normalize(rawUser);
	}

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

	async registerUser(user) {
		let { login, phone, email, password, balance, name } = user;
		const userExist = await this.checkUserExistByPhone(phone);
		if (userExist) {
			throw new Forbidden('Such phone is registered');
		}
		if (!email) {
			email = null;
		}
		const newUser = await User.create({
			login,
			password,
			email,
			balance,
			name,
			phone,
			role: 'client',
		});
		return normalizeOne(newUser).id;
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
}

export const userService = new UserService();
