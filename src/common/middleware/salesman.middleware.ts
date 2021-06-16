import { Forbidden } from '../errors/forbidden';

export const salesmanMiddleware = (req, res, next) => {
	const { user } = req.params;
	if (user.role !== 'salesman') {
		next(new Forbidden('Forbidden'));
	} else {
		res.locals.user = user;
		next();
	}
};