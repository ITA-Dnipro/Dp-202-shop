import { NextFunction, Request, Response } from 'express';
import { productsService } from './../products/product.service';
import { json } from 'sequelize';
import { ValidatedRequest } from 'express-joi-validation';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { userService } from './user.service';
import { INewProduct, IProduct } from '../../common/dtos/new.product.dto';
import { ProductAttributes } from '../../db/models/Product.model';

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

 public addProduct = asyncHandler(async (req: ValidatedRequest<INewProduct>, res: Response): Promise<void> => {
		const { product } = req.body;
		const newProduct = await productsService.addNewProduct(product);
		BaseView.buildSuccessView(res, newProduct);
	});
}
export const userController = new UserController();
