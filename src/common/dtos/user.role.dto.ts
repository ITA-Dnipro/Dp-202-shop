import * as Joi from 'joi';
import {
	ContainerTypes,
	createValidator,
	ValidatedRequestSchema,
} from 'express-joi-validation';

export const validator = createValidator();

export enum EStatus {
	rejected = 'rejected',
	salesman = 'salesman',
}

export interface IUserRoleBody extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		status: EStatus;
		id: number;
	};
}

export interface IUserData {
	role: EStatus;
}

export const userRoleDto = Joi.object({
	status: Joi.string().valid('rejected', 'salesman').required(),
	id: Joi.number().positive().required(),
});
