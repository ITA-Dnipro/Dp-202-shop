import express from 'express';
import { authDto, validator } from '../../common/dtos/auth.dto';
import { authController } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/', validator.body(authDto), authController.login);

// Example of usage
// authRouter.get('/admin', authenticate, adminMiddleware, (req,res) => {
//     res.send(res.locals.user);
// });

export { authRouter };