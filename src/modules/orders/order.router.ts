import express from 'express';
import { ordersController } from './order.controller';
import { productBodyDto, validator } from '../../common/dtos/orders.dto';
import { checkProductsMiddleware } from '../../common/middleware/check.products.middleware';

const ordersRouter = express.Router();

ordersRouter.post(
	'/',
	validator.body(productBodyDto),
	checkProductsMiddleware,
	ordersController.handleOrder,
);

export { ordersRouter };
