import { IUserRequestSchema } from '../dtos/auth.dto';
import { Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { Forbidden } from '../errors/forbidden';

export const adminMiddleware = (req:ValidatedRequest<IUserRequestSchema>, res:Response, next:NextFunction):void => {
	const { user } = req.params;
	if (user.role !== 'admin') {
		next(new Forbidden('Forbidden'));
	} else {
		res.locals.user = user;
		next();
	}
};
