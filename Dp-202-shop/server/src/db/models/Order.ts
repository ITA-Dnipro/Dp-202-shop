import { Model } from "sequelize";

const getOrderModel = (sequelize, DataTypes) => {
  class Order extends Model<OrderAttributes>
    implements OrderAttributes {
    public id!: number;
    public salesman_id!: number;
    public buyer_id!: number;
    public total_sum!: number;
    public status: 'new' | 'in progress' | 'done';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  interface OrderAttributes {
    id: number;
    salesman_id: number;
    buyer_id: number;
    total_sum: number;
    status: string;
  }

  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    salesman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_sum: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'in progress', 'done'),
      defaultValue: 'new',
    }
  }, {
    sequelize,
    modelName: 'Order'
  });

  return Order;
};

export default getOrderModel;
