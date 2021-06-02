import { ValidatedRequest } from 'express-joi-validation';
import { INewUser } from './../../common/dtos/reg.dto';
import { Response } from 'express';
import { asyncHandler } from '../../common/helpers/async.handler';
import { BaseView } from '../../common/views/view';
import { regModel } from './reg.service';

class RegController {
	reg = asyncHandler(
		async (req: ValidatedRequest<INewUser>, res: Response): Promise<void> => {
			const user = req.body;
			await regModel.reg(user);
			BaseView.buildSuccessView(res, [], 'User was succesfuly created');
		},
	);
}

export const regController = new RegController();
