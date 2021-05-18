import { IProduct, productModel } from './product.model';
import { Request, Response } from 'express';
import { ApiError } from '../../common/errors/api-errors';
import { BaseView } from '../../common/views/view';
import { ValidationObject, Validator } from '../../common/validators/validator';

class ProductController {

  public async getAll(req: Request, res: Response) {
    try {
      const products: Array<IProduct> = await productModel.getList();
      return BaseView.buildSuccessView(res, products);
    } catch (e) {
      return BaseView.buildErrorView(res, ApiError.badRequest(e.message));
    }
  }

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const error: ValidationObject = Validator.isNumber(id);

    if (error) {
      return BaseView.buildErrorView(res, ApiError.badRequest(error.reason));
    }

    try {
      const product: Array<IProduct> = await productModel.findOne(id);
      return BaseView.buildSuccessView(res, product);
    } catch (e) {
      return BaseView.buildErrorView(res, ApiError.badRequest(e.message));
    }
  }

  public async getByQuery(req: Request, res: Response) {
    const { categories, products, manufactures } = req.query;
    const error: ValidationObject = Validator.validateQuery(categories);
    if (error) {
      return BaseView.buildErrorView(res, ApiError.badRequest(error.reason));
    }

    try {
      const productsResult = await productModel.findByQuery(categories, products, manufactures);
      return productsResult.length
        ? BaseView.buildSuccessView(res, productsResult)
        : BaseView.buildErrorView(res, ApiError.badRequest('Products are not found'));
    } catch (e) {
      return BaseView.buildErrorView(res, ApiError.badRequest(e.message));
    }
  }
}

export const productsController = new ProductController();
