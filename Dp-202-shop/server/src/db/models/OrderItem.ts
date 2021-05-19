import * as Sequelize from 'sequelize';
import {ProductAttributes, ProductInstance} from "./Product";
import {SequelizeAttributes} from '../typings/SequelizeAttribetes';
import {OrderAttributes, OrderInstance} from "./Order";

export interface OrderItemAttributes {
  id?: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// @ts-ignore
export interface OrderItemInstance extends Sequelize.Instance<OrderItemAttributes>, OrderItemAttributes {
  // belongsTo: Order, Product
  getOrder: Sequelize.BelongsToGetAssociationMixin<OrderInstance>;
  setOrder: Sequelize.BelongsToSetAssociationMixin<OrderInstance, OrderInstance['id']>;
  createOrder: Sequelize.BelongsToCreateAssociationMixin<OrderAttributes>;
  getProduct: Sequelize.BelongsToGetAssociationMixin<ProductInstance>;
  setProduct: Sequelize.BelongsToSetAssociationMixin<ProductInstance, ProductInstance['id']>;
  createProduct: Sequelize.BelongsToCreateAssociationMixin<ProductAttributes>;
}

export const OrderItemFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<OrderItemInstance, OrderItemAttributes> => {
  const attributes: SequelizeAttributes<OrderItemAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  };

  // @ts-ignore
  return sequelize.define<OrderItemInstance, OrderItemAttributes>('OrderItem', attributes);

  // OrderItem.associate = models => {
  //   OrderItem.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
  //   OrderItem.belongsTo(models.Order, { as: 'order', foreignKey: 'order_id' })
  // };
  //
  // return OrderItem;
};

// const getOrderItemModel = (sequelize, DataTypes) => {
//   class OrderItem extends Model<OrderItemAttributes>
//     implements OrderItemAttributes {
//     public id!: number;
//     public order_id!: number;
//     public product_id!: number;
//     public quantity!: number;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//   }
//
//   interface OrderItemAttributes {
//     id: number;
//     order_id: number;
//     product_id: number;
//     quantity: number;
//   }
//
//   OrderItem.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true
//     },
//     order_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     product_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 1
//     },
//   }, {
//     sequelize,
//     modelName: 'OrderItem'
//   });
//
//   return OrderItem;
// };
//
// export default getOrderItemModel;
