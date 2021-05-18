import * as Sequelize from "sequelize";
import { CategoryAttributes, CategoryInstance } from "../../models/Category";
import { UnitAttributes, UnitInstance } from "../../models/Unit";
import { ManufactureAttributes, ManufactureInstance } from "../../models/Manufacture";
import { ProductAttributes, ProductInstance } from "../../models/Product";
import { UserAttributes, UserInstance } from '../../models/User';
import { OrderAttributes, OrderInstance } from '../../models/Order';
import { OrderItemAttributes, OrderItemInstance } from '../../models/OrderItem';



export interface DbInterface {
  // Op: Function;
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Category: Sequelize.Model<CategoryInstance, CategoryAttributes>;
  Unit: Sequelize.Model<UnitInstance, UnitAttributes>;
  Manufacture: Sequelize.Model<ManufactureInstance, ManufactureAttributes>;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Product: Sequelize.Model<ProductInstance, ProductAttributes>;
  Order: Sequelize.Model<OrderInstance, OrderAttributes>;
  OrderItem: Sequelize.Model<OrderItemInstance, OrderItemAttributes>;
}
