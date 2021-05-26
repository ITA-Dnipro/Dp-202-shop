import { Forbidden } from '../errors/forbidden';

export const adminMiddleware = (req, res, next) => {
	const { user } = req;
	if (user.role !== 'admin') {
		next(new Forbidden('Forbidden'));
	} else {
		res.locals.user = user;
		next();
	}
};
