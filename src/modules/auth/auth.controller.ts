import { Request, Response } from 'express';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { authModel } from './auth.service';

class AuthController {
	login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
		const { body } = req;
		const user = await authModel.login(body);
		await BaseView.buildSuccessView(res, user);
	});
}

export const authController = new AuthController();
