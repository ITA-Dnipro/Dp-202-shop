import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { ISearchParams } from '../../common/dtos/search.params.dto';
import { IId } from '../../common/dtos/id.dto';
import { productsService, IDbData } from './product.service';
import { IProduct } from '../../common/dtos/new.product.dto';

class ProductController {
	public getAll = asyncHandler(
		async (req: Response, res: Response, next: NextFunction): Promise<void> => {
			const products: Array<IProduct> = await productsService.getAllProducts();
			BaseView.buildSuccessView(res, products);
		},
	);

	public getOne = asyncHandler(
		async (
			req: ValidatedRequest<IId>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const product: IProduct = await productsService.getOneProductById(
				id,
				false,
			);
			BaseView.buildSuccessView(res, product);
		},
	);

	public getByQuery = asyncHandler(
		async (
			req: ValidatedRequest<ISearchParams>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			// const products: Array<IProduct> = await productModel.getList();
			// return BaseView.buildSuccessView(res, products);
		},
	);

	public getAllCategories = asyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const categories: Array<IDbData> | void =
				await productsService.getTableData('categories');
			BaseView.buildSuccessView(res, categories);
		},
	);

	public getAllManufactures = asyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const manufactures: Array<IDbData> | void =
				await productsService.getTableData('manufactures');
			BaseView.buildSuccessView(res, manufactures);
		},
	);

	public getAllUnits = asyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const units: Array<IDbData> | void = await productsService.getTableData(
				'units',
			);
			BaseView.buildSuccessView(res, units);
		},
	);
}

export const productsController = new ProductController();
