import express from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';
import { salesmanMiddleware } from '../../common/middleware/salesman.middleware';
import { orderStatusDto } from '../../common/dtos/status.dto';
import { idDto } from '../../common/dtos/id.dto';
import { newProductDto, validator } from '../../common/dtos/new.product.dto';

const userRoute = express.Router();

userRoute.get('/', authenticate);
userRoute.get(
	'/edit/:id',
	authenticate,
	salesmanMiddleware,
	validator.params(idDto),
	userController.getSalesmanProductById,
);
userRoute.put(
	'/edit/:id',
	authenticate,
	salesmanMiddleware,
	validator.params(idDto),
	validator.body(newProductDto),
	userController.editSalesmanProduct,
);
userRoute.post(
	'/add',
	authenticate,
	salesmanMiddleware,
	validator.body(newProductDto),
	userController.addProduct,
);
userRoute.get(
	'/products',
	authenticate,
	salesmanMiddleware,
	userController.getSalesmanProducts,
);
userRoute.get(
	'/orders/:id',
	authenticate,
	salesmanMiddleware,
	userController.getOrderDetailsById,
);
userRoute.put(
	'/orders/:id',
	authenticate,
	salesmanMiddleware,
	validator.body(orderStatusDto),
	userController.changeOrderStatus,
);

export { userRoute };
