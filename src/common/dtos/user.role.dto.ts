import * as Joi from 'joi';
import {
	ContainerTypes,
	createValidator,
	ValidatedRequestSchema,
} from 'express-joi-validation';

export const validator = createValidator();

export interface IUserRoleBody extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		status: string;
		id: number;
	};
}

export interface IUserData {
	role: string;
}

export const userRoleDto = Joi.object({
	status: Joi.string().valid('rejected', 'salesman').required(),
	id: Joi.number().positive().required(),
});
