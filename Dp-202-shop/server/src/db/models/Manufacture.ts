import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttribetes';
import {ProductAttributes, ProductInstance} from "./Product";

export interface ManufactureAttributes {
  manufacture: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// @ts-ignore
export interface ManufactureInstance extends Sequelize.Instance<ManufactureAttributes>, ManufactureAttributes {
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

export const ManufactureFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<ManufactureInstance, ManufactureAttributes> => {
  const attributes: SequelizeAttributes<ManufactureAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    manufacture: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  };

  // @ts-ignore
  const Manufacture = sequelize.define<ManufactureInstance, ManufactureAttributes>('Manufacture', attributes);

  Manufacture.associate = models => {
    Manufacture.hasMany(models.Products);
  };

  return Manufacture;
};


//
//
// const getManufactureModel = (sequelize, DataTypes) => {
//   class Manufacture extends Model<ManufactureAttributes>
//     implements ManufactureAttributes {
//     public id!: number;
//     public manufacture!: string;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//   }
//
//   interface ManufactureAttributes {
//     id: number;
//     manufacture: string;
//   }
//
//   Manufacture.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     manufacture: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//   }, {
//     sequelize,
//     modelName: 'Manufacture',
//   });
//
//   return Manufacture;
// };
//
// export default getManufactureModel;
