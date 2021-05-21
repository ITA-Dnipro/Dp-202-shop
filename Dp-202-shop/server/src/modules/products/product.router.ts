import express from 'express';
import { productsController } from './product.controller';
import { searchParamsDto, validator } from '../../common/dtos/search.params.dto';
import {idDto} from '../../common/dtos/id.dto';
const productsRouter = express.Router();


productsRouter.get("/", productsController.getAll);
productsRouter.get("/search", validator.query(searchParamsDto), productsController.getByQuery);
productsRouter.get("/:id", validator.params(idDto), productsController.getOne);
productsRouter.get('/allcategories', productsController.getAllCategories);
productsRouter.get('/allmanufactures', productsController.getAllManufactures);
productsRouter.get('/allunits', productsController.getAllUnits);

export {productsRouter};
