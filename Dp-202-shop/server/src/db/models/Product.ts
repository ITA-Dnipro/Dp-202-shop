import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttribetes';
import { CategoryAttributes, CategoryInstance } from './Category';
import { UnitAttributes, UnitInstance } from './Unit';
import { ManufactureAttributes, ManufactureInstance } from './Manufacture';
import { UserAttributes, UserInstance } from './User';
import { OrderItemAttributes, OrderItemInstance } from './OrderItem';

export interface ProductAttributes {
  vendor_code: number;
  product_name: string;
  amount: string;
  price: number;
  id?: number;
  deleted?:boolean;
  ingredients?: string;
  img?: string;
}

// @ts-ignore
export interface ProductInstance extends Sequelize.Instance<ProductAttributes>, ProductAttributes {
  // belongsTo: Unit, Category, Manufacture, User
  getCategory: Sequelize.BelongsToGetAssociationMixin<CategoryInstance>;
  setCategory: Sequelize.BelongsToSetAssociationMixin<CategoryInstance, CategoryInstance['id']>;
  createCategory: Sequelize.BelongsToCreateAssociationMixin<CategoryAttributes>;
  getUnit: Sequelize.BelongsToGetAssociationMixin<UnitInstance>;
  setUnit: Sequelize.BelongsToSetAssociationMixin<UnitInstance, UnitInstance['id']>;
  createUnit: Sequelize.BelongsToCreateAssociationMixin<UnitAttributes>;
  getManufacture: Sequelize.BelongsToGetAssociationMixin<ManufactureInstance>;
  setManufacture: Sequelize.BelongsToSetAssociationMixin<ManufactureInstance, ManufactureInstance['id']>;
  createManufacture: Sequelize.BelongsToCreateAssociationMixin<ManufactureAttributes>;
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;
  // has many: OrderItem
  getOrderItems: Sequelize.HasManyGetAssociationsMixin<OrderItemInstance>;
  setOrderItems: Sequelize.HasManySetAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  addOrderItems: Sequelize.HasManyAddAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  addOrderItem: Sequelize.HasManyAddAssociationMixin<OrderItemInstance, OrderItemInstance['id']>;
  createOrderItem: Sequelize.HasManyCreateAssociationMixin<OrderItemAttributes>;
  removeOrderItem: Sequelize.HasManyRemoveAssociationMixin<OrderItemInstance, ProductInstance['id']>;
  removeOrderItems: Sequelize.HasManyRemoveAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  hasOrderItem: Sequelize.HasManyHasAssociationMixin<OrderItemInstance, OrderItemInstance['id']>;
  hasOrderItems: Sequelize.HasManyHasAssociationsMixin<OrderItemInstance, OrderItemInstance['id']>;
  countOrderItems: Sequelize.HasManyCountAssociationsMixin;
}

export const ProductFactory = (sequelize: Sequelize.Sequelize): Sequelize.Model<ProductInstance, ProductAttributes> => {
  // @ts-ignore
  const attributes: SequelizeAttributes<ProductAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    vendor_code: {
      type: Sequelize.INTEGER,
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.REAL,
      allowNull: false,
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    img: {
      type: Sequelize.STRING,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  };

  // @ts-ignore
  const Product = sequelize.define<ProductInstance, ProductAttributes>('Product', attributes);

  Product.associate = models => {
    Product.belongsTo(models.Category, { as: 'category', foreignKey: 'category_id' });
    Product.belongsTo(models.Unit, { as: 'unit', foreignKey: 'unit_id' });
    Product.belongsTo(models.Manufacture, { as: 'manufacture', foreignKey: 'manufacture_id' });
    Product.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Product;
};



// const getProductModel = (sequelize, DataTypes) => {
//   class Product extends Model<ProductAttributes>
//     implements ProductAttributes {
//     public id!: number;
//     public vendor_code!: number;
//     public product_name!: string;
//     public amount!: string;
//     public price!: number;
//     public user_id!: string;
//     public manufacture_id!: string;
//     public unit_id!: string;
//     public category_id!: string;
//     public deleted?:boolean;
//     public ingredients?: string;
//     public img?: string;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//   }
//
//   interface ProductAttributes {
//     id: number;
//     vendor_code: number;
//     product_name: string;
//     amount: string;
//     price: number;
//     user_id: string;
//     manufacture_id: string;
//     unit_id: string;
//     category_id: string;
//     deleted?:boolean;
//     ingredients?: string;
//     img?: string;
//   }
//
//   Product.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true
//     },
//     vendor_code: {
//       type: DataTypes.INTEGER,
//     },
//     product_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     amount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.REAL,
//       allowNull: false,
//     },
//     ingredients: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     img: {
//       type: DataTypes.STRING,
//     },
//     deleted: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false
//     },
//     manufacture_id: {
//       type: DataTypes.INTEGER,
//       // foreignKey: true,
//       allowNull: false,
//       // references: {
//       //   model: {tableName: 'manufactures'},
//       //   key: 'id',
//       // },
//     },
//     unit_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // foreignKey: true,
//       // references: {
//       //   model: {tableName: 'units'},
//       //   key: 'id',
//       // },
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // foreignKey: true,
//       // references: {
//       //   model: {tableName: 'users'},
//       //   key: 'id',
//       // },
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // foreignKey: true,
//       // references: {
//       //   model: {tableName: 'categories'},
//       //   key: 'id',
//       // },
//     }
//   }, {
//     sequelize,
//     modelName: 'Product'
//   });
//
//   return Product;
// };
//
// export default getProductModel;
