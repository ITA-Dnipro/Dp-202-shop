import { User } from '../../db/models/User.model';
import { normalize, normalizeOne } from '../../common/helpers/dataNormalization';
import { IDbData } from '../products/product.service';
import { Op } from 'sequelize';
import { Forbidden } from '../../common/errors/forbidden';

class UserService {

  async checkUserExistByPhone(phone) {
    const foundUser = await this.findUserByPhone(phone);
    return Boolean(foundUser.length)
  };

  async findUserByPhone(phoneNum) {
    const rawUser = await User.findAll({
      attributes: ['id', 'user_name', 'phone', 'password', 'email'],
      where: {
        phone: phoneNum
      }
    });
    return normalize(rawUser);
  }

  async registerUser(user) {
    let { login, phone, email, password, balance, name } = user;
    const userExist = await this.checkUserExistByPhone(phone);
    if (userExist) {
      throw new Forbidden('Such phone is registered')
    }
    if (!email) {
      email = null;
    }
    const newUser = await User.create({
      login: login,
      password: password,
      email: email,
      balance: balance,
      name: name,
      phone: phone,
      role: 'client'
    });
    return normalizeOne(newUser).id
  }
  async findOrCreateSalesman(login) {
    const rawSalesman = await User.findAll({
      attributes:
        ['id', 'login'],
      where: { [Op.and]: [{ role: 1 }, { login: { [Op.iLike]: `%${login.toLowerCase()}%` } }] }
    });
    if (rawSalesman.length === 0) {
      const newRawSalesman = User.create({
        login: login,
        role: 'salesman',
        password: 'default',
        phone: 'default',
        email: 'default',
        balance: 0
      });
      const newSalesMan = normalizeOne(newRawSalesman);
      return newSalesMan.id
    }
    const salesMan = normalize(rawSalesman);
    return salesMan.id;

  }
  async getAllUsersByRole(role: string): Promise<Array<IDbData>> {
    const rawSalesmenData = await User.findAll({
      attributes:
        ['id', 'login'],
      where: { role: role }
    });
    return normalize(rawSalesmenData);
  }

}

export const userService = new UserService();
