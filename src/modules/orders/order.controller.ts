import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { BaseView } from '../../common/views/view';
import { ordersService } from './order.service';
import { IProductRequestSchema } from '../../common/dtos/orders.dto';
import { asyncHandler } from '../../common/helpers/async.handler';

class OrdersController {
	public handleOrder = asyncHandler(
		async (
			req: ValidatedRequest<IProductRequestSchema>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { products } = res.locals;
			const userId = req.params.user.id;
			const order = await ordersService.completeOrder(userId, products);
			BaseView.buildSuccessView(res, order);
		},
	);
}

export const ordersController = new OrdersController();
