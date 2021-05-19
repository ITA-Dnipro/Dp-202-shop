'use strict';
import Sequelize from 'sequelize';
import sequelize from '../config/db_config.js';
// import {DbInterface} from '../typings/DbInterface';
// import {CategoryFactory} from './Category';
// import { UnitFactory } from './Unit';
// import { ManufactureFactory } from './Manufacture';
// import { UserFactory } from './User';
import { ProductFactory } from './Product';
import { OrderFactory } from './Order';
import { OrderItemFactory } from './OrderItem';


// const db: DbInterface = {
//   const db = {
//   sequelize,
//   Sequelize,
//   Category: CategoryFactory(sequelize),
//   Unit: UnitFactory(sequelize),
//   Manufacture: ManufactureFactory(sequelize),
//   Product: ProductFactory(sequelize),
//   User: UserFactory(sequelize),
//   Order: OrderFactory(sequelize),
//   OrderItem: OrderItemFactory(sequelize)
// };

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;
console.log(ProductFactory(sequelize));
console.log(db);

// export default db;
// module.exports = db;

// db.Op = sequelize.Op;
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = sequelize;
// db.Op = sequelize.Op;
