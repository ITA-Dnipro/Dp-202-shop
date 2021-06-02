import { Request, Response } from 'express';
import { json } from 'sequelize';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { userService } from './user.service';

<<<<<<< HEAD
class UserController {}
=======
class UserController {
	// success = asyncHandler(async (req: Request, res: Response): Promise<any> => {
	// 	return res.json({ message: 'Success' });
	// });
}
>>>>>>> fb43d303b47bba1f2ebb8f296d6aa3168fc83064

export const userController = new UserController();
