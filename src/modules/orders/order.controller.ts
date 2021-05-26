// import { Request, Response, NextFunction } from 'express';
// import { BaseView } from '../../common/views/view';
// import { ordersService } from './order.service';
// import { IProductRequestSchema } from './../../common/dto/orders.dto';
// import { ValidatedRequest } from 'express-joi-validation';
// import { asyncHandler } from '../../common/helpers/async.handler';


// class OrdersController {

//   public handleOrder = asyncHandler(async (req: ValidatedRequest<IProductRequestSchema>, res: Response, next: NextFunction): Promise<void> => {
//     if (res.locals.isAuthenticated) {
//       const { products, user } = res.locals;
//       const order = await ordersService.completeOrder(user, products);
//       BaseView.buildSuccessView(res, order);
//     }
//   });

// }

// export const ordersController = new OrdersController();
