import { Response, NextFunction } from 'express';
import { ValidatedRequestSchema } from 'express-joi-validation';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { ordersService } from '../orders/order.service';

class UserController {
	changeOrderStatus = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const { status } = req.body;
			const user = res.locals.user;
			const order = await ordersService.changeOrderStatusBySalesman(
				id,
				status,
				user.dataValues.id,
			);
			BaseView.buildSuccessView(res, order, `Order was marked as ${status}`);
		},
	);
}

export const userController = new UserController();
