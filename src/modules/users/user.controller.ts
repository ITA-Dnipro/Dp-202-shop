import { NextFunction, Request, Response } from 'express';
import { productsService } from './../products/product.service';
import { json } from 'sequelize';
import { ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { userService } from './user.service';
import { INewProduct, IProduct } from '../../common/dtos/new.product.dto';
import { ProductAttributes } from '../../db/models/Product.model';
import { ordersService } from '../orders/order.service';

class UserController {
	public getSalesmanProductById = asyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const salesmanId: number = res.locals.user.id;
			const { id } = req.params;
			const product: IProduct = await userService.getSalesmanProductById(
				salesmanId,
				+id,
			);
			BaseView.buildSuccessView(res, product);
		},
	);

	public editSalesmanProduct = asyncHandler(
		async (
			req: ValidatedRequest<INewProduct>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const salesmanId: number = res.locals.user.id;
			const { id } = req.params;
			const { product } = req.body;
			const updatedProduct: Array<ProductAttributes> | void =
				await userService.editSalesmanProduct(salesmanId, +id, product);
			BaseView.buildSuccessView(res, updatedProduct);
		},
	);

	public addProduct = asyncHandler(
		async (
			req: ValidatedRequest<INewProduct>,
			res: Response,
		): Promise<void> => {
			const { product } = req.body;
			const newProduct = await productsService.addNewProduct(product);
			BaseView.buildSuccessView(res, newProduct);
		},
	);

	public getSalesmanProducts = asyncHandler(
		async (req: Request, res: Response): Promise<void> => {
			const { id } = res.locals.user;
			const products = await productsService.getAllProductsExtended(id);
			if (products.length > 0) {
				BaseView.buildSuccessView(res, products);
			} else {
				BaseView.buildSuccessView(
					res,
					products,
					'You have no products at the moment',
				);
			
public getOrderDetailsById = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const user = res.locals.user;
			const orderDetails = await ordersService.getOrderDetailsByIdAndSalesman(
				id,
				user.dataValues.id,
			);
			BaseView.buildSuccessView(res, orderDetails);
		},
	);

public changeOrderStatus = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const { status } = req.body;
			const user = res.locals.user;
			const order = await ordersService.changeOrderStatusBySalesman(
				id,
				status,
				user.dataValues.id,
			);
			BaseView.buildSuccessView(res, order, `Order was marked as ${status}`);
		},
	);
}
export const userController = new UserController();
