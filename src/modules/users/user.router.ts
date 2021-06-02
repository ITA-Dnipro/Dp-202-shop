import express from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';
import { salesmanMiddleware } from '../../common/middleware/salesman.middleware';

const userRoute = express.Router();

userRoute.get(
	'/orders/:id',
	authenticate,
	salesmanMiddleware,
	userController.getOrderDetailsById,
);

export { userRoute };
