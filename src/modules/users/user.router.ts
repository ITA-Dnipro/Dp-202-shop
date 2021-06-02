import express from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';

const userRoute = express.Router();

userRoute.get('/', authenticate);

export { userRoute };
