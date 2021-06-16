import { Request, Response, NextFunction } from 'express';
import { IError } from '../errors/baseError';

export default (
	err: IError,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	res.status(err.statusCode || 500).json({
		success: false,
		error: err.error || 'Server error',
		data: err.data,
	});
};
