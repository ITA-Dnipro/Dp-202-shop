import express from 'express';
import { adminController } from './admin.controller';
import { newProductDto, validator } from '../../common/dtos/new.product.dto';
import { idDto } from '../../common/dtos/id.dto';


const adminRouter = express.Router();

adminRouter.get("/all-salesmen", adminController.getAllSalesmenLogins);
adminRouter.get("/products", adminController.getAllProducts);
adminRouter.get("/products/add", adminController.showNothing);
adminRouter.post("/products/add", validator.body(newProductDto), adminController.addNewProduct);
adminRouter.get("/products/:id", validator.params(idDto), adminController.getProductDetails);
adminRouter.put("/products/:id", validator.params(idDto), validator.body(newProductDto), adminController.updateProduct);
adminRouter.delete("/products/:id", validator.params(idDto), adminController.deleteProduct);


export { adminRouter };
