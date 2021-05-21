import express from 'express';
import { adminController } from './admin.controller';
import { newProductDto, validator } from '../../common/dtos/new.product.dto';
import {idDto} from '../../common/dtos/id.dto';


const adminRouter = express.Router();

adminRouter.get("/products/add", /*hashCheckMiddlware, */ adminController.showNothing);
adminRouter.post("/products/add", /*hashCheckMiddlware, */ validator.body(newProductDto), adminController.addNewProduct);
adminRouter.get("/allsalesmen",  adminController.getAllSalesmen);
adminRouter.put("/products/:id", /*hashCheckMiddlware,*/ validator.params(idDto), adminController.updateProduct);
adminRouter.get("/products/:id", /*hashCheckMiddlware,*/ validator.params(idDto), adminController.getProductDetails);

export { adminRouter };
