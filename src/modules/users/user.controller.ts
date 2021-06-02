import { productsService } from './../products/product.service';
import { INewProduct } from './../../common/dtos/new.product.dto';
import { ValidatedRequest } from 'express-joi-validation';
import { Request, Response } from 'express';
import { json } from 'sequelize';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { userService } from './user.service';

class UserController {
    addProduct = asyncHandler(async (req: ValidatedRequest<INewProduct>, res: Response): Promise<void> => {
		const { product } = req.body;
		const newProduct = await productsService.addNewProduct(product);
		BaseView.buildSuccessView(res, newProduct);
	});
}

export const userController = new UserController();
