import * as Joi from 'joi';
import {
	ContainerTypes,
	createValidator,
	ValidatedRequestSchema,
} from 'express-joi-validation';

export const validator = createValidator();

export enum EStatus {
	rejected = 'rejected',
	approve = 'approve',
}

export interface IUserRoleBody extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		status: EStatus;
		id: number;
	};
}

export interface IUserData {
	status: EStatus;
	role: string;
}

export const userRoleDto = Joi.object({
	status: Joi.string().valid('rejected', 'approve').required(),
	id: Joi.number().positive().required(),
});
