import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../common/helpers/async.handler';
// import { BaseView } from '../../common/views/view';
import { ValidatedRequest } from 'express-joi-validation';
import {ISearchParams } from '../../common/dtos/search.params.dto';
import {IId } from '../../common/dtos/id.dto';

class ProductController {

    public getAll = asyncHandler(async (req: Response, res: Response, next: NextFunction): Promise<void> => {

        // const products: Array<IProduct> = await productModel.getList();
        // return BaseView.buildSuccessView(res, products);
    });

    public getOne = asyncHandler(async (req: ValidatedRequest<IId>, res: Response, next: NextFunction): Promise<void> => {
        // const { id } = req.params;
        // const product: Array<IProduct> = await productModel.findOne(id);
        // return BaseView.buildSuccessView(res, product);
    });

    public  getByQuery = asyncHandler(async (req: ValidatedRequest<ISearchParams>, res: Response, next: NextFunction): Promise<void> => {
        // const products: Array<IProduct> = await productModel.getList();
        // return BaseView.buildSuccessView(res, products);
    });

    public  getAllCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    });

    public  getAllManufactures = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    });

    public getAllUnits = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    });


}

export const productsController = new ProductController();
