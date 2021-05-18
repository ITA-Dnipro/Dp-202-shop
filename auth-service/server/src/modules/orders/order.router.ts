import express from 'express';
import { orderController } from './order.controller';
import { productBodySchema, productHeaderSchema, validator } from './order.schema';
import { authMiddleware } from '../../common/middleware/auth.middleware';


export const router = express.Router();

router.post(
  '/',
  validator.headers(productHeaderSchema),
  authMiddleware,
  validator.body(productBodySchema),
  orderController.create
);
