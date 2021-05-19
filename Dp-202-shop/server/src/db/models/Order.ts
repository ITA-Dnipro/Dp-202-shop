import * as Sequelize from 'sequelize';
import {SequelizeAttributes} from '../typings/SequelizeAttribetes';
import {UserAttributes, UserInstance} from "./User";
import {OrderItemAttributes, OrderItemInstance} from "./OrderItem";
import {ManufactureAttributes} from "./Manufacture";

export interface OrderAttributes {
  total_sum: number;
  status?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export  type OrderCreateAttributes = Pick<OrderAttributes, 'total_sum'>

// @ts-ignore
export interface OrderInstance extends Sequelize.Instance<OrderAttributes>, OrderAttributes {
  // belongsTo: User: seller + buyer
  getSeller: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setSeller: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createSeller: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;
  getBuyer: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setBuyer: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createBuyer: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;
  // has many: OrderItem
  getOrderItems: Sequelize.HasManyGetAssociationsMixin<OrderItemInstance>;
  setOrderItems: Sequelize.HasManySetAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  addOrderItems: Sequelize.HasManyAddAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  addOrderItem: Sequelize.HasManyAddAssociationMixin<OrderItemInstance, OrderItemInstance['id']>;
  createOrderItem: Sequelize.HasManyCreateAssociationMixin<OrderItemAttributes>;
  removeOrderItem: Sequelize.HasManyRemoveAssociationMixin<OrderItemInstance, OrderItemInstance['id']>;
  removeOrderItems: Sequelize.HasManyRemoveAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  hasOrderItem: Sequelize.HasManyHasAssociationMixin<OrderItemInstance, OrderItemInstance['id']>;
  hasOrderItems: Sequelize.HasManyHasAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  countOrderItems: Sequelize.HasManyCountAssociationsMixin;
}

export const OrderFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<OrderInstance, OrderAttributes> => {
  const attributes: SequelizeAttributes<OrderAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    total_sum: {
      type: Sequelize.REAL,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('new', 'in progress', 'done'),
      defaultValue: 'new',
    }
  };

  // @ts-ignore
  return sequelize.define<OrderInstance, OrderAttributes>('Order', attributes);

  // Order.associate = models => {
  //   Order.hasMany(models.OrderItem);
  //   Order.belongsTo(models.User, { as: 'salesman', foreignKey: 'salesman_id' });
  //   Order.belongsTo(models.User, { as: 'buyer', foreignKey: 'buyer_id' });
  // };
  //
  // return Order;
};


// const getOrderModel = (sequelize, DataTypes) => {
//   class Order extends Model<OrderAttributes>
//     implements OrderAttributes {
//     public id!: number;
//     public salesman_id!: number;
//     public buyer_id!: number;
//     public total_sum!: number;
//     public status: 'new' | 'in progress' | 'done';
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//   }
//
//   interface OrderAttributes {
//     id: number;
//     salesman_id: number;
//     buyer_id: number;
//     total_sum: number;
//     status: string;
//   }
//
//   Order.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true
//     },
//     salesman_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     buyer_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     total_sum: {
//       type: DataTypes.REAL,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM('new', 'in progress', 'done'),
//       defaultValue: 'new',
//     }
//   }, {
//     sequelize,
//     modelName: 'Order'
//   });
//
//   return Order;
// };
//
// export default getOrderModel;
