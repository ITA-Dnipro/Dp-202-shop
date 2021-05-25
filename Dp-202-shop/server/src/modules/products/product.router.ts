import express from 'express';
import { productsController } from './product.controller';
import { searchParamsDto, validator } from '../../common/dtos/search.params.dto';
import {idDto} from '../../common/dtos/id.dto';

const productsRouter = express.Router();

productsRouter.get("/search", validator.query(searchParamsDto), productsController.getByQuery);
productsRouter.get("/", productsController.getAll);
productsRouter.get('/all-categories', productsController.getAllCategories);
productsRouter.get('/all-manufactures', productsController.getAllManufactures);
productsRouter.get('/all-units', productsController.getAllUnits);
productsRouter.get("/:id", validator.params(idDto), productsController.getOne);


export {productsRouter};
