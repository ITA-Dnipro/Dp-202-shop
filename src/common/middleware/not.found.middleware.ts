import { NextFunction, Response, Request } from 'express';
import { NotFound } from '../errors/notFound';

function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
	next(new NotFound('This page doesnt exist'));
}

export { notFoundMiddleware };
