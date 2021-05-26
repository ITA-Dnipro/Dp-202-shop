import { Unauthorized } from './../../common/errors/unauthorized';
import { User } from "../../db/models/User.model";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';


class AuthModel {
    async findUserByLogin(login) {
        const user = await User.findOne({
            where: {
                login: login,
            },
        });
        return user;
    }

    async login({ login, password }) {

        // Check if user exists
        let user = await this.findUserByLogin(login);

        if (!user) {
            throw new Unauthorized('Incorrect login or password');
        }

        // Compare password from body with password from DB
        const compare = bcrypt.compareSync(password, user.password);

        // if password is uncorrect return error
        if (!compare) {
            throw new Unauthorized('Incorrect login or password');
        }

        // if user with such password and login exists - create a token and pass it
        const token = jsonwebtoken.sign({ id: user.id }, 'secret');

        return token;
    }

    async findUserById(id) {
        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        return user;
    }
}

export const authModel = new AuthModel();