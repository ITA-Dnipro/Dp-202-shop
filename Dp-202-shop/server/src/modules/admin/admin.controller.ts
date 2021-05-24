import { asyncHandler } from '../../common/helpers/async.handler';
import { Request, Response, NextFunction } from 'express';
import { BaseView } from '../../common/views/view';
import { ValidatedRequestSchema, ValidatedRequest } from 'express-joi-validation'
import { productsService } from '../products/product.service';
import { INewProduct } from '../../common/dtos/new.product.dto';
import { userService } from '../users/user.service'
import {ordersService} from '../orders/order.service';

class AdminController {
    showNothing = asyncHandler(async (req: ValidatedRequestSchema, res: Response, next: NextFunction): Promise<void> => {
        await BaseView.buildSuccessView(res, []);
    });

    getAllSalesmen = asyncHandler(async (req: ValidatedRequestSchema, res: Response, next: NextFunction): Promise<void> => {
        const allSalesmen = await userService.getAllUsersByRole('salesman');
        await BaseView.buildSuccessView(res, allSalesmen);
    });

    addNewProduct = asyncHandler(async (req: ValidatedRequest<INewProduct>, res: Response, next: NextFunction): Promise<void> => {
        const { product } = req.body;
        const newProduct = await productsService.addNewProduct(product);
        await BaseView.buildSuccessView(res, newProduct);
    });

    updateProduct = asyncHandler (async  (req, res, next) => {
        const id = req.params.id;
        const {product} = req.body;
        const updatedProduct = await productsService.updateProduct(id, product);
        await BaseView.buildSuccessView(res, updatedProduct);
    });

    getProductDetails = asyncHandler (async  (req, res, next) => {
        const id = req.params.id;
        const updatedProduct = await productsService.getOneProductById(id);
        await BaseView.buildSuccessView(res, updatedProduct);
    });

  getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await ordersService.getAllOrders();
    BaseView.buildSuccessView(res, orders);
  })

  getOrderDetailsById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const orderDetails = await ordersService.getOrderDetailsById(id);
    BaseView.buildSuccessView(res, orderDetails);
  })

  changeOrderStatus = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {status} = req.query;
    const order = await ordersService.changeOrderStatus(id,status);
    BaseView.buildSuccessView(res, order);
  })

  getAllClients = asyncHandler(async (req, res, next) => {
    const users = await userService.getAllUsersByRole('client');
    BaseView.buildSuccessView(res, users);
  })

}

export const adminController = new AdminController();
