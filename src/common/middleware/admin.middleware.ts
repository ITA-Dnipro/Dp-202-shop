import { Forbidden } from '../errors/forbidden';

export const adminMiddleware = async (req, res, next) => {
	const { user } = req.params;
	if (user.role !== 'admin') {
		next(new Forbidden('Forbidden'));
	} else {
		res.locals.user = user;
		next();
	}
};