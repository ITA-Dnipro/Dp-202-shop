import * as Sequelize from 'sequelize';
import { ProductAttributes, ProductInstance } from "./Product";
import { SequelizeAttributes } from '../typings/SequelizeAttribetes';
import {OrderAttributes, OrderInstance} from "./Order";

export interface UserAttributes {
  login: string;
  password: string;
  email: string;
  balance: number;
  id?: number;
  name?: string;
  phone?: string;
  role: string;
}

// @ts-ignore
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  // User.hasMany(models.Product)
  getProducts: Sequelize.HasManyGetAssociationsMixin<ProductInstance>;
  setProducts: Sequelize.HasManySetAssociationsMixin<ProductInstance, ProductInstance['id']>;
  addProducts: Sequelize.HasManyAddAssociationsMixin<ProductInstance, ProductInstance['id']>;
  addProduct: Sequelize.HasManyAddAssociationMixin<ProductInstance, ProductInstance['id']>;
  createProduct: Sequelize.HasManyCreateAssociationMixin<ProductAttributes>; //? , ProductInstance>
  removeProduct: Sequelize.HasManyRemoveAssociationMixin<ProductInstance, ProductInstance['id']>;
  removeProducts: Sequelize.HasManyRemoveAssociationsMixin<ProductInstance, ProductInstance['id']>;
  hasProduct: Sequelize.HasManyHasAssociationMixin<ProductInstance, ProductInstance['id']>;
  hasProducts: Sequelize.HasManyHasAssociationsMixin<ProductInstance, ProductInstance['id']>;
  countProducts: Sequelize.HasManyCountAssociationsMixin;
  // User.hasMany(models.Order): salesman_id
  getSellers: Sequelize.HasManyGetAssociationsMixin<OrderInstance>;
  setSellers: Sequelize.HasManySetAssociationsMixin<OrderInstance, OrderInstance['id']>;
  addSellers: Sequelize.HasManyAddAssociationsMixin<OrderInstance, OrderInstance['id']>;
  addSeller: Sequelize.HasManyAddAssociationMixin<OrderInstance, OrderInstance['id']>;
  createSeller: Sequelize.HasManyCreateAssociationMixin<OrderAttributes>; //? , ProductInstance>
  removeSeller: Sequelize.HasManyRemoveAssociationMixin<OrderInstance, OrderInstance['id']>;
  removeSellers: Sequelize.HasManyRemoveAssociationsMixin<OrderInstance, OrderInstance['id']>;
  hasSeller: Sequelize.HasManyHasAssociationMixin<OrderInstance, OrderInstance['id']>;
  hasSellers: Sequelize.HasManyHasAssociationsMixin<OrderInstance, OrderInstance['id']>;
  countSellers: Sequelize.HasManyCountAssociationsMixin;
  // User.hasMany(models.Order): buyer_id
  getBuyers: Sequelize.HasManyGetAssociationsMixin<OrderInstance>;
  setBuyers: Sequelize.HasManySetAssociationsMixin<OrderInstance, OrderInstance['id']>;
  addBuyers: Sequelize.HasManyAddAssociationsMixin<OrderInstance, OrderInstance['id']>;
  addBuyer: Sequelize.HasManyAddAssociationMixin<OrderInstance, OrderInstance['id']>;
  createBuyer: Sequelize.HasManyCreateAssociationMixin<OrderAttributes>; //? , ProductInstance>
  removeBuyer: Sequelize.HasManyRemoveAssociationMixin<OrderInstance, OrderInstance['id']>;
  removeBuyers: Sequelize.HasManyRemoveAssociationsMixin<OrderInstance, OrderInstance['id']>;
  hasBuyer: Sequelize.HasManyHasAssociationMixin<OrderInstance, OrderInstance['id']>;
  hasBuyers: Sequelize.HasManyHasAssociationsMixin<OrderInstance, OrderInstance['id']>;
  countBuyers: Sequelize.HasManyCountAssociationsMixin;
}

export const UserFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    balance: {
      type: Sequelize.REAL,
    },
    role: {
      type: Sequelize.ENUM('client', 'salesman', 'admin'),
      defaultValue: 'client'
    }
  };

  // @ts-ignore
  return sequelize.define<UserInstance, UserAttributes>('User', attributes);

  // User.associate = models => {
  //   User.hasMany(models.Product);
  //   User.hasMany(models.Order);
  // };
  //
  // return User;
};

// const getUserModel = (sequelize, DataTypes) => {
//   class User extends Model<UserAttributes>
//     implements UserAttributes {
//     public id!: number;
//     public login!: string;
//     public password!: string;
//     public email!: string;
//     public balance!: number;
//     public role: 'client' | 'salesman' | 'admin';
//     public name?: string;
//     public phone?: string;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//   }
//
//   interface UserAttributes {
//     id: number;
//     login: string;
//     password: string;
//     email: string;
//     balance: number;
//     name?: string;
//     phone?: string;
//     role: string;
//   }
//
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true
//     },
//     login: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     balance: {
//       type: DataTypes.INTEGER,
//     },
//     role: {
//       type: DataTypes.ENUM(['client', 'salesman', 'admin']),
//       defaultValue: 'client'
//     }
//   }, {
//     sequelize,
//     modelName: 'User'
//   });
//
//   return User;
// };
//
// export default getUserModel;
