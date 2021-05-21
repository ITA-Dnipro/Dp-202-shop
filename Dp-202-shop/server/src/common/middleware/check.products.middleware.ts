import { productsService } from '../../modules/products/product.service';
import { NotFoundData } from '../errors/notFoundData';
import { NextFunction, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { IProductRequestSchema } from '../dtos/orders.dto';


export const checkProductsMiddleware = async function (req: ValidatedRequest<IProductRequestSchema>, res: Response, next: NextFunction): Promise<void> {
    const { products } = req.body;
    const foundProducts = await productsService.retrieveIdAmount(products);
    const idNotExist = await productsService.checkIdExists(products, foundProducts);
    if (idNotExist.length > 0) {
        next(new NotFoundData(idNotExist, 'Such products are not found'));
    }
    const notAvailable = await productsService.checkAvailability(products, foundProducts);
    if (notAvailable.length > 0) {
        next(new NotFoundData(notAvailable, 'Not enough products'));
    }
    res.locals.products = products;
    next();
};

