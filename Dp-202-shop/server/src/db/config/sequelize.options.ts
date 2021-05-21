import {SequelizeOptions} from 'sequelize-typescript';
import dotenv from "dotenv";
import {Category} from "../models/Category.model"
import {Unit} from "../models/Unit.model";
import {Product} from "../models/Product.model";
import {Manufacture} from "../models/Manufacture.model";
import {User} from "../models/User.model";
import {Order} from '../models/Order.model';
import {OrderItem} from '../models/OrderItem.model'
dotenv.config({path:__dirname+'/../.env'});
const env = process.env.NODE_ENV || 'development';
const { [env]: mode} = require('./config');

export const sequelizeOptions: SequelizeOptions = {
  host: mode.host,
  dialect: mode.dialect,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  storage: ':memory:',
  models: [ Product, Category, User, Manufacture, Unit, Order, OrderItem],
  logging: false,
};
