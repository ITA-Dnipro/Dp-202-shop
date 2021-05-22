import { NotFound } from "../errors/notFound";
import { NextFunction, Response, Request } from 'express';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction ) {
    next(new NotFound('This page doesnt exist'));
}