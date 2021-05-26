import express from 'express';
import { ordersController } from './order.controller';
import { productBodyDto, validator } from '../../common/dtos/orders.dto';
import { checkProductsMiddleware } from '../../common/middleware/check.products.middleware';
import { authenticate } from '../../common/middleware/auth.middleware';

const ordersRouter = express.Router();

ordersRouter.post(
	'/',
	authenticate,
	validator.body(productBodyDto),
	checkProductsMiddleware,
	ordersController.handleOrder,
);

export { ordersRouter };
