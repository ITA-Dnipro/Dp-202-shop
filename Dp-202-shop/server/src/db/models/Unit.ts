import *as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttribetes';
import {ProductAttributes, ProductInstance} from "./Product";

export interface UnitAttributes {
  unit: string;
  unit_name: string;
  measure: number;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// @ts-ignore
export interface UnitInstance extends Sequelize.Instance<UnitAttributes>, UnitAttributes {
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
}

export const UnitFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<UnitInstance, UnitAttributes> => {
  const attributes: SequelizeAttributes<UnitAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    measure: {
      type: Sequelize.REAL,
      defaultValue: 1
    },
    unit_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  // @ts-ignore
  return sequelize.define<UnitInstance, UnitAttributes>('Unit', attributes);
  //
  // Unit.associate = models => {
  //   Unit.hasMany(models.Products);
  // };
  //
  // return Unit;
};

// const getUnitModel = (sequelize, DataTypes) => {
//
//   class Unit extends Model<UnitAttributes>
//     implements UnitAttributes {
//     public id!: number;
//     public unit!: string;
//     public  unit_name!: string;
//     public measure!: number;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//   }
//
//   interface UnitAttributes {
//     id?: number;
//     unit: string;
//     unit_name: string;
//     measure: number;
//   }
//
//   Unit.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     unit: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     measure: {
//       type: DataTypes.REAL,
//       defaultValue: 1
//     },
//     unit_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   }, {
//     sequelize,
//     modelName: 'Unit',
//   });
//
//   return Unit;
// };
//
// export default getUnitModel;
