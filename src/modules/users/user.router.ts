import express from 'express';
import { validator } from '../../common/dtos/new.product.dto';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';
import { salesmanMiddleware } from '../../common/middleware/salesman.middleware';
import { orderStatusDto } from '../../common/dtos/status.dto';

const userRoute = express.Router();

userRoute.put(
	'/orders/:id',
	authenticate,
	salesmanMiddleware,
	validator.body(orderStatusDto),
	userController.changeOrderStatus,
);

export { userRoute };
