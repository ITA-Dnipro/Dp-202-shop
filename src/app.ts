import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser = require('body-parser');
import errorHandlerMiddleware from './common/middleware/error-handler.middleware';
import sequelize from './db/config/db';
import { productsRouter } from './modules/products/product.router';
import { adminRouter } from './modules/admin/admin.router';
import { userRoute } from './modules/users/user.router';
import { ordersRouter } from './modules/orders/order.router';
import { notFoundMiddleware } from './common/middleware/not.found.middleware';
import { authRouter } from './modules/auth/auth.router';
import { regRouter } from './modules/registration/reg.router';

dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize
	.authenticate()
	.then(() => console.log(`Database connected`))
	.catch((err) => console.error(`Error: ${err}`));

const app: Application = express();

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/admin', /* authMiddleware, adminMiddleWare */ adminRouter);
app.use('/user', userRoute);
app.use('/order', /* authMiddleware */ ordersRouter);
app.use('/auth', authRouter);
app.use('/reg', regRouter);

app.use('*', notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
	console.log(`Server run on port: ${PORT}`);
});
