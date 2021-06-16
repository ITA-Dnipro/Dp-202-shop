import * as Joi from 'joi';
import {
	ContainerTypes,
	ValidatedRequestSchema,
	createValidator,
} from 'express-joi-validation';

export const validator = createValidator();

export interface INewUser extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		user: IUser;
	};
}

export interface IUser {
	name?: string;
	login: string;
	password: string;
	email: string;
	phone?: string;
}

export const regDto = Joi.object({
	login: Joi.string().min(2).max(50).required(),
	password: Joi.string().min(4).max(16).required(),
	email: Joi.string().required(),
	name: Joi.string().min(2).max(20),
	phone: Joi.string().min(12).max(12),
});
