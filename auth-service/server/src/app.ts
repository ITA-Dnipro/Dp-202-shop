import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './modules';
import { notFound } from './common/errors/not-found';
import { errorHandlerMiddleware } from './common/middleware/error-handler.middleware';
import { sequelizeConnection } from './config/database';

dotenv.config();
const PORT = process.env.PORT || 3000;

sequelizeConnection.authenticate()
  .then(() => console.log(`Database connected on: ${process.env.DB_HOST}:${process.env.DB_PORT}`))
  .catch(err => console.error('Error: ' + err));

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('*', notFound);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {console.log(`Server run on port: ${PORT}`)});
