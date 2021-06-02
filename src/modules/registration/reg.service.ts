import { Forbidden } from './../../common/errors/forbidden';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { User } from '../../db/models/User.model';
import sequelize from '../../db/config/db';

class RegModel {
	async findUser(login: string, email: string): Promise<User> {
		const user = await User.findOne({
			where: {
				[Op.or]: [{ login: login }, { email: email }],
			},
		});
		return user;
	}

	async reg(newUser): Promise<void> {
		const { login, email, password } = newUser;

		// Check if user already exists
		let isUser = await this.findUser(login, email);

		if (isUser) {
			throw new Forbidden('Such user already exists');
		}

		// Change plain password to hash
		const hash = await bcrypt.hash(password, 10);
		newUser.password = hash;
		newUser.balance = 0;

		// add new user to DB
		await sequelize.transaction(async (t) => {
			await User.create(newUser, { transaction: t });
		});
	}
}

export const regModel = new RegModel();
