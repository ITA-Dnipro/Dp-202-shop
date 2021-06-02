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
			const { id } = req.params;
			const user = res.locals.user;
			const orderDetails = await ordersService.getOrderDetailsByIdAndSalesman(
				id,
				user.dataValues.id,
			);
			BaseView.buildSuccessView(res, orderDetails);
		},
	);
}

export const userController = new UserController();
