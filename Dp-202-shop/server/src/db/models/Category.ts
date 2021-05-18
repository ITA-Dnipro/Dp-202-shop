import * as Sequelize from 'sequelize';
import {ProductAttributes, ProductInstance} from "./Product";
import {SequelizeAttributes} from '../typings/SequelizeAttribetes';

export interface CategoryAttributes {
  id?: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// @ts-ignore
export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {
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
  const Category = sequelize.define<CategoryInstance, CategoryAttributes>('Category', attributes);

  Category.associate = models => {
    Category.hasMany(models.Products);
  };

  return Category;
};


// export interface UserAttributes {
//   id: number;
//   category: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
//
// export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {
//   // At the moment, there's nothing more to add apart
//   // from the methods and attributes that the types
//   // `Sequelize.Instance<UserAttributes>` and
//   // `UserAttributes` give us. We'll add more here when
//   //  we get on to adding associations.
// };
//
// export const getCategoryModel = (sequelize: Sequelize, DataTypes: Sequelize.DataTypes): Model<CategoryInstance, CategoryAttributes> => {
//   const attributes: SequelizeAttributes<CategoryAttributes> = {
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
//   };
//
//   const Category = sequelize.define<CategoryInstance, UserAttributes>('Category', attributes);
//
//   return Category;
// };


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
