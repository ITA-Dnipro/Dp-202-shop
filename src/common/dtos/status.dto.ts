import * as Joi from 'joi';
import {
	ContainerTypes,
	ValidatedRequestSchema,
	createValidator,
} from 'express-joi-validation';
import { ENUM } from 'sequelize';

export const validator = createValidator();

export interface IOrderStatus extends ValidatedRequestSchema {
	[ContainerTypes.Params]: {
		status: string;
	};
}

// export const orderStatusDto = Joi.object().keys({
// 	status: Joi.string()
// 		.pattern(/^in progress|rejected|completed$/)
// 		.required(),
// });

export const orderStatusDto = Joi.object().keys({
	status: Joi.valid(...Object.values(ENUM)).required(),
});
