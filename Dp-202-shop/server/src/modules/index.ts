import express from 'express';
import { router as userRouter } from './users/user.router';
import { router as productsRouter } from './products/product.router';
import { router as orderRouter } from './orders/order.router';

const router = express.Router();

// router.use('/user', customValidator, userRouter );
router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/order', orderRouter);

export default router;
