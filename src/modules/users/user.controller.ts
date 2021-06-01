import { Request, Response } from 'express';
import { json } from 'sequelize';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { userService } from './user.service';

class UserController {
	// success = asyncHandler(async (req: Request, res: Response): Promise<any> => {
	// 	return res.json({ message: 'Success' });
	// });
}

export const userController = new UserController();
