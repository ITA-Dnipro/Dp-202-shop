import { asyncHandler } from '../../common/helpers/async.handler';
import { Request, Response, NextFunction } from 'express';
import { BaseView } from '../../common/views/view';
import { ValidatedRequestSchema, ValidatedRequest } from 'express-joi-validation'
import { productsService } from '../products/product.service';
import { INewProduct } from '../../common/dtos/new.product.dto';
import { userService } from '../users/user.service'
import { UserRole } from '../users/user.service';
import { IId } from '../../common/dtos/id.dto';

class AdminController {

    getAllProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const allProducts = await productsService.getAllProductsExtended();
        BaseView.buildSuccessView(res, allProducts)
    });

    showNothing = asyncHandler(async (req: ValidatedRequestSchema, res: Response, next: NextFunction): Promise<void> => {
        BaseView.buildSuccessView(res, []);
    });

    getAllSalesmenLogins = asyncHandler(async (req: ValidatedRequestSchema, res: Response, next: NextFunction): Promise<void> => {
        const allSalesmen = await userService.getAllUsersByRole(UserRole.Salesman, ['id', 'login']);
        BaseView.buildSuccessView(res, allSalesmen);
    });

    addNewProduct = asyncHandler(async (req: ValidatedRequest<INewProduct>, res: Response, next: NextFunction): Promise<void> => {
        const { product } = req.body;
        const newProduct = await productsService.addNewProduct(product);
        BaseView.buildSuccessView(res, newProduct);
    });

    updateProduct = asyncHandler(async (req: ValidatedRequest<INewProduct>, res: Response, next: NextFunction): Promise<void> => {
        const id: number = req.params.id;
        const { product } = req.body;
        const updatedProduct = await productsService.updateProduct(id, product);
        BaseView.buildSuccessView(res, updatedProduct);
    });

    getProductDetails = asyncHandler(async (req: ValidatedRequest<IId>, res: Response, next: NextFunction): Promise<void> => {
        const id: number = req.params.id;
        const updatedProduct = await productsService.getOneProductById(id, true);
        BaseView.buildSuccessView(res, updatedProduct);

    });

    deleteProduct = asyncHandler(async (req: ValidatedRequest<IId>, res: Response, next: NextFunction): Promise<void> => {
        const id: number = req.params.id;
        const deletedProduct = await productsService.deleteProduct(id)
        BaseView.buildSuccessView(res, deletedProduct);
    });
}

export const adminController = new AdminController();
