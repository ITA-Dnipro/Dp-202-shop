import { productsService } from './../products/product.service';
import { INewProduct } from './../../common/dtos/new.product.dto';
import { ValidatedRequest } from 'express-joi-validation';
import { Request, Response } from 'express';
import { json } from 'sequelize';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { userService } from './user.service';

class UserController {
	addProduct = asyncHandler(
		async (
			req: ValidatedRequest<INewProduct>,
			res: Response,
		): Promise<void> => {
			const { product } = req.body;
			const newProduct = await productsService.addNewProduct(product);
			BaseView.buildSuccessView(res, newProduct);
		},
	);
	
	getOrders = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const { id } = res.locals.user;

			const orders = await userService.getOrdersById(id);

			if (orders.length > 0) {
				BaseView.buildSuccessView(res, orders);
			} else {
				BaseView.buildSuccessView(
					res,
					orders,
					'You have no orders at the moment',
				);
			}
		},
	);
}

export const userController = new UserController();
