import express from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';
import { salesmanMiddleware } from '../../common/middleware/salesman.middleware';
import { idDto } from '../../common/dtos/id.dto';
import { validator } from '../../common/dtos/search.params.dto';
import { newProductDto } from '../../common/dtos/new.product.dto';

const userRoute = express.Router();

userRoute.get('/');
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

export { userRoute };
