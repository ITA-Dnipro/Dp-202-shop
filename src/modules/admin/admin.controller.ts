import { Request, Response, NextFunction } from 'express';
import {
	ValidatedRequestSchema,
	ValidatedRequest,
} from 'express-joi-validation';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { productsService } from '../products/product.service';
import { INewProduct } from '../../common/dtos/new.product.dto';
import { userService, UserRole } from '../users/user.service';
import { ordersService } from '../orders/order.service';
import { IUserRoleBody } from '../../common/dtos/user.role.dto';
import { IId } from '../../common/dtos/id.dto';

class AdminController {
	getAllProducts = asyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const allProducts = await productsService.getAllProductsExtended();
			BaseView.buildSuccessView(res, allProducts);
		},
	);

	showNothing = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			BaseView.buildSuccessView(res, []);
		},
	);

	getAllSalesmenLogins = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const allSalesmen = await userService.getAllUsersByRole(
				UserRole.Salesman,
				['id', 'login'],
			);
			BaseView.buildSuccessView(res, allSalesmen);
		},
	);

	addNewProduct = asyncHandler(
		async (
			req: ValidatedRequest<INewProduct>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { product } = req.body;
			const newProduct = await productsService.addNewProduct(product);
			BaseView.buildSuccessView(res, newProduct);
		},
	);

	updateProduct = asyncHandler(
		async (
			req: ValidatedRequest<INewProduct>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const { product } = req.body;
			const updatedProduct = await productsService.updateProduct(id, product);
			BaseView.buildSuccessView(res, updatedProduct);
		},
	);

	getProductDetails = asyncHandler(
		async (
			req: ValidatedRequest<IId>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const updatedProduct = await productsService.getOneProductById(id, true);
			BaseView.buildSuccessView(res, updatedProduct);
		},
	);

	getAllOrders = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const orders = await ordersService.getAllOrders();
			BaseView.buildSuccessView(res, orders);
		},
	);

	getOrderDetailsById = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const orderDetails = await ordersService.getOrderDetailsById(id);
			BaseView.buildSuccessView(res, orderDetails);
		},
	);

	changeOrderStatus = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const { status } = req.query;
			const order = await ordersService.changeOrderStatus(id, status);
			BaseView.buildSuccessView(res, order);
		},
	);

	getAllClients = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const users = await userService.getAllUsersByRole(UserRole.Client, [
				'id',
				'login',
				'name',
				'phone',
				'email',
				'balance',
				'createdAt',
			]);
			BaseView.buildSuccessView(res, users);
		},
	);

	deleteProduct = asyncHandler(
		async (
			req: ValidatedRequest<IId>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const deletedProduct = await productsService.deleteProduct(id);
			BaseView.buildSuccessView(res, deletedProduct);
		},
	);

	getUser = asyncHandler(
		async (
			req: ValidatedRequestSchema,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const { id } = req.params;
			const user = await userService.getUserInfo(id);
			BaseView.buildSuccessView(res, user);
		},
	);

	getSalesmanRoleReq = asyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			const roleReq = await userService.getSalesmanRoleReq();
			BaseView.buildSuccessView(res, roleReq);
		},
	);

	approveSalesman = asyncHandler(
		async (
			req: ValidatedRequest<IUserRoleBody>,
			res: Response,
			next: NextFunction,
		): Promise<void> => {
			const role = req.body.status;
			const userId = req.body.id;
			const result: string = await userService.approveSalesman(userId, role);
			BaseView.buildSuccessView(res, [], result);
		},
	);
}

export const adminController = new AdminController();
