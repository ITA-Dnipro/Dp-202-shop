import * as Joi from 'joi';
import {
	ContainerTypes,
	ValidatedRequestSchema,
	createValidator,
} from 'express-joi-validation';

export const validator = createValidator();

export interface IProductRequestSchema extends ValidatedRequestSchema {
	// [ContainerTypes.Headers]: {
	// 	login: string;
	// 	phone: string;
	// 	password: string;
	// };
	[ContainerTypes.Body]: {
		products: IProductsArray;
	};
	// [ContainerTypes.Params]: {
	// 	user: IUser;
	// };
}

export type IProductsArray = Array<{
	id: number;
	count: number;
}>;

export type IUser = {
	id: number;
};

export const userLoginDto = Joi.object({
	login: Joi.string().min(2).max(50).required(),
	phone: Joi.string()
		.pattern(/^\+\d{10,15}/i)
		.required(),
	password: Joi.string().min(4).max(16).required(),
});

export const productBodyDto = Joi.object({
	products: Joi.array()
		.has(
			Joi.object({
				id: Joi.number().integer().positive().required(),
				count: Joi.number().integer().positive().less(100).required(),
			}),
		)
		.required(),
});
