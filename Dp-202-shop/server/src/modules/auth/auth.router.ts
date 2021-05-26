import express from 'express';
import { authDto, validator } from '../../common/dtos/auth.dto';
import { authController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/', validator.body(authDto), authController.login);


export { authRouter };