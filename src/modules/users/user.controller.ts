import { Response, NextFunction } from 'express';
import { ValidatedRequestSchema } from 'express-joi-validation';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { ordersService } from '../orders/order.service';

class UserController {
	getOrderDetailsById = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id, user } = req.params;
			const orderDetails = await ordersService.getOrderDetailsByIdAndSalesman(
				id,
				user.salesman_id,
			);
			BaseView.buildSuccessView(res, orderDetails);
		},
	);
}

export const userController = new UserController();
