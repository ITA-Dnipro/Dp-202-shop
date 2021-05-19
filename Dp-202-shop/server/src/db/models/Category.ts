import * as Sequelize from 'sequelize';
import {ProductAttributes, ProductInstance} from "./Product";
import {SequelizeAttributes} from '../typings/SequelizeAttribetes';
// const Sequelize  = require('sequelize');
// const { ProductAttributes, ProductInstance } = require("./Product");
// const {SequelizeAttributes} = require('../typings/SequelizeAttribetes');

export interface CategoryAttributes {
  id?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryCreateAttributes = Pick<CategoryAttributes, 'category'>

// @ts-ignore
export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {
  getProducts: Sequelize.HasManyGetAssociationsMixin<ProductInstance>;
  setProducts: Sequelize.HasManySetAssociationsMixin<ProductInstance, ProductInstance['id']>;
  addProducts: Sequelize.HasManyAddAssociationsMixin<ProductInstance, ProductInstance['id']>;
  addProduct: Sequelize.HasManyAddAssociationMixin<ProductInstance, ProductInstance['id']>;
  createProduct: Sequelize.HasManyCreateAssociationMixin<ProductAttributes>;
  removeProduct: Sequelize.HasManyRemoveAssociationMixin<ProductInstance, ProductInstance['id']>;
  removeProducts: Sequelize.HasManyRemoveAssociationsMixin<ProductInstance, ProductInstance['id']>;
  hasProduct: Sequelize.HasManyHasAssociationMixin<ProductInstance, ProductInstance['id']>;
  hasProducts: Sequelize.HasManyHasAssociationsMixin<ProductInstance, ProductInstance['id']>;
  countProducts: Sequelize.HasManyCountAssociationsMixin;
}

export const CategoryFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<CategoryInstance, CategoryAttributes> => {
  const attributes: SequelizeAttributes<CategoryAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  };

  // @ts-ignore
  return sequelize.define<CategoryInstance, CategoryAttributes>('Category', attributes);

  // Category.associate = models => {
  //   Category.hasMany(models.Products);
  // };

  // return Category;
};


// const getCategoryModel = (sequelize, DataTypes) => {
//   class Category extends Model<CategoryAttributes>
//
//     implements CategoryAttributes {
//     public id?: number;
//     public category!: string;
//     public readonly createdAt?: Date;
//     public readonly updatedAt?: Date;
//   }
//
//   interface CategoryAttributes {
//     id: number;
//     category: string;
//   }
//
//   Category.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true
//     },
//     category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     }
//   }, {
//     sequelize,
//     modelName: 'Category'
//   });
//
//   return Category;
// };
//
// export default getCategoryModel;
