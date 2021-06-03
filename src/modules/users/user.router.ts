import { salesmanMiddleware } from './../../common/middleware/salesman.middleware';
import express from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';
import { newProductDto, validator } from '../../common/dtos/new.product.dto';

const userRoute = express.Router();

userRoute.get('/', authenticate);
userRoute.post(
	'/add',
	authenticate,
	salesmanMiddleware,
	validator.body(newProductDto),
	userController.addProduct,
);
userRoute.get(
	'/orders',
	authenticate,
	salesmanMiddleware,
	userController.getOrders,
);

export { userRoute };
