import express from 'express';
import { adminController } from './admin.controller';
import { newProductDto, validator } from '../../common/dtos/new.product.dto';
import {idDto} from '../../common/dtos/id.dto';
import {orderStatusDto} from '../../common/dtos/status.dto';


const adminRouter = express.Router();

adminRouter.get("/products/add", /*hashCheckMiddlware, */ adminController.showNothing);
adminRouter.post("/products/add", /*hashCheckMiddlware, */ validator.body(newProductDto), adminController.addNewProduct);
adminRouter.get("/all-salesmen",  adminController.getAllSalesmen);
adminRouter.put("/products/:id", /*hashCheckMiddlware,*/ validator.params(idDto), adminController.updateProduct);
adminRouter.get("/products/:id", /*hashCheckMiddlware,*/ validator.params(idDto), adminController.getProductDetails);
adminRouter.get('/orders',/*hashCheckMiddlware,*/ adminController.getAllOrders);
adminRouter.get('/orders/:id',validator.params(idDto), adminController.getOrderDetailsById);
adminRouter.patch('/orders/:id', validator.params(idDto), validator.query(orderStatusDto), adminController.changeOrderStatus);
adminRouter.get('/clients', /*hashCheckMiddlware,*/ adminController.getAllClients);

export { adminRouter };
