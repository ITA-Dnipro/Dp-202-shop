import postgresPool from '../../db/db-adapter';

class UserModel {
  create() {
  }

  async getOne(login: string, password: string): Promise<any> {
    const query = `SELECT * FROM users WHERE login = $1 AND password = $2`;
    const request = await postgresPool.query(query, [login, password]);
    return request.rows[0] || null;
  }
}

export const userModel = new UserModel();
