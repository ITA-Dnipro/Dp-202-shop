import postgresPool from '../../db/db-adapter';
import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../../config/database';

export class Order extends Model {

}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: sequelizeConnection,
  modelName: 'Order',
  timestamps: false
});

class OrderModel {
  public async findProducts(ids: string) {
    const query = `SELECT id, amount FROM products
                   WHERE id IN (${ids});`;
    const request = await postgresPool.query(query);
    return request.rows;
  }

  public async create(products, userId) {
    const createOrderQuery = `INSERT INTO orders (created, user_id)
                              VALUES ('${new Date().toISOString()}', ${userId})
                              RETURNING id`;
    const order = await postgresPool.query(createOrderQuery);
    const orderId = order.rows[0].id;

    const values = products.map(product => `(${product.count}, ${product.id}, ${orderId})`);
    const createDetailsQuery = `INSERT INTO order_details (quantity, product_id, order_id)
                                VALUES ${values.join(', ')};`;
    const request = await postgresPool.query(createDetailsQuery);
    return request.rows;
  }
}

export const orderModel = new OrderModel();
