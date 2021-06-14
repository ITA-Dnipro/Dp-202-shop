import express from 'express';
import { adminController } from './admin.controller';
import { newProductDto, validator } from '../../common/dtos/new.product.dto';
import { idDto } from '../../common/dtos/id.dto';
import { orderStatusDto } from '../../common/dtos/status.dto';
import { authenticate } from '../../common/middleware/auth.middleware';
import { adminMiddleware } from '../../common/middleware/admin.middleware';
import { userRoleDto } from '../../common/dtos/user.role.dto';

const adminRouter = express.Router();

adminRouter.get(
	'/products/add',
	authenticate,
	adminMiddleware,
	adminController.showNothing,
);
adminRouter.post(
	'/products/add',
	authenticate,
	adminMiddleware,
	validator.body(newProductDto),
	adminController.addNewProduct,
);
adminRouter.put(
	'/products/:id',
	authenticate,
	adminMiddleware,
	validator.params(idDto),
	validator.body(newProductDto),
	adminController.updateProduct,
);
adminRouter.get(
	'/products/:id',
	authenticate,
	adminMiddleware,
	validator.params(idDto),
	adminController.getProductDetails,
);
adminRouter.get(
	'/orders',
	authenticate,
	adminMiddleware,
	adminController.getAllOrders,
);
adminRouter.get(
	'/orders/:id',
	authenticate,
	adminMiddleware,
	validator.params(idDto),
	adminController.getOrderDetailsById,
);
adminRouter.patch(
	'/orders/:id',
	authenticate,
	adminMiddleware,
	validator.params(idDto),
	validator.query(orderStatusDto),
	adminController.changeOrderStatus,
);
adminRouter.get(
	'/clients',
	authenticate,
	adminMiddleware,
	adminController.getAllClients,
);
adminRouter.get(
	'/all-salesmen',
	authenticate,
	adminMiddleware,
	adminController.getAllSalesmenLogins,
);
adminRouter.get(
	'/products',
	authenticate,
	adminMiddleware,
	adminController.getAllProducts,
);
adminRouter.delete(
	'/products/:id',
	authenticate,
	adminMiddleware,
	validator.params(idDto),
	adminController.deleteProduct,
);
adminRouter.get(
	'/user/:id',
	authenticate,
	adminMiddleware,
	adminController.getUser,
);
adminRouter.get(
	'/pending-req/',
	authenticate,
	adminMiddleware,
	adminController.getSalesmanRoleReq,
);
adminRouter.put(
	'/pending-req/',
	authenticate,
	adminMiddleware,
	validator.body(userRoleDto),
	adminController.approveSalesman,
);

export { adminRouter };
