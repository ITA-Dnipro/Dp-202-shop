import { Model } from "sequelize";

const getOrderItemModel = (sequelize, DataTypes) => {
  class OrderItem extends Model<OrderItemAttributes>
    implements OrderItemAttributes {
    public id!: number;
    public order_id!: number;
    public product_id!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  interface OrderItemAttributes {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
  }

  OrderItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {
    sequelize,
    modelName: 'OrderItem'
  });

  return OrderItem;
};

export default getOrderItemModel;
