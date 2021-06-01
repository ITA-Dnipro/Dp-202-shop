import * as Joi from 'joi';
import {
	ContainerTypes,
	ValidatedRequestSchema,
	createValidator,
} from 'express-joi-validation';

export const validator = createValidator();

export interface IUserRequestSchema extends ValidatedRequestSchema {
	[ContainerTypes.Params]: {
		user: IUser;
	};
}

export type IUser = {
	id: number,
    login: string,
    password: string,
    email?: string,
    balance:number,
    name?:string,
    phone?: string,
    role?:string,
    createdAt?:Date,
    updatedAt?:Date
};

export interface IAuthRequestSchema extends ValidatedRequestSchema {
	[ContainerTypes.Body]: {
		login: string;
		password: string;
	};
}

export const authDto = Joi.object({
	login: Joi.string().min(2).max(50).required(),
	password: Joi.string().min(4).max(16).required(),
});
