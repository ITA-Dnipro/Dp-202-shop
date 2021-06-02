import express from 'express';
import { regDto, validator } from '../../common/dtos/reg.dto';
import { regController } from './reg.controller';

const regRouter = express.Router();

regRouter.post('/', validator.body(regDto), regController.reg);

export { regRouter };
