import { Request, Response } from 'express';
import { ValidationObject, Validator } from '../../common/validators/validator';
import { BaseView } from '../../common/views/view';
import { ApiError } from '../../common/errors/api-errors';
import { orderModel } from './order.model';
import { IProductRequestSchema } from './order.schema';
import { ValidatedRequest } from 'express-joi-validation';


class OrderController {

  public async create(req: ValidatedRequest<IProductRequestSchema>, res: Response) {
    const { products } = req.body;
    let error: ValidationObject = Validator.validateOrder(products);
    if (error) {
      return BaseView.buildErrorView(res, ApiError.badRequest(error.reason));
    }

    const ids = products.map(product => product.id).join(', ');
    try {
      const resultProducts = await orderModel.findProducts(ids);
      error = Validator.validateProductsCount(products, resultProducts);
      if (error) {
        return BaseView.buildErrorView(res, ApiError.badRequest(error.reason));
      }

      await orderModel.create(products, res.locals.user.id);

      return BaseView.buildSuccessView(res, []);
    } catch (e) {
      return BaseView.buildErrorView(res, ApiError.badRequest(e.message));
    }
  }
}

export const orderController = new OrderController();
