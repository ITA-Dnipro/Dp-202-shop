import { NotFound } from "../errors/notFound";
import { NextFunction, Response, Request } from 'express';

function notFoundMiddleware(req: Request, res: Response, next: NextFunction ) {
    next(new NotFound('This page doesnt exist'));
}

export {notFoundMiddleware}
