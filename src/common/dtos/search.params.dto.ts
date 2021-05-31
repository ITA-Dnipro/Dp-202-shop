import * as Joi from 'joi';

import {
	ValidatedRequestSchema,
	createValidator,
} from 'express-joi-validation';

export const validator = createValidator();

export interface IWhereQuery {
	product_name?: unknown;
	manufacture?: unknown;
	category_id?: unknown;
	deleted?: unknown | boolean;
}

export interface ISearchParams extends ValidatedRequestSchema {
	categories?: string;
	manufactures?: string;
	products?: string;
	status?: string;
	id?: string;
	price?: string;
}

export const searchParamsDto = Joi.object()
	.keys({
		products: Joi.string().min(1).optional(),
		manufactures: Joi.string().min(1).optional(),
		categories: Joi.string()
			.min(1)
			.pattern(/^[1-9]{1,8}(,[^0][0-9]{0,8})*?$/)
			.optional(),
		status: Joi.string().valid('all', 'deleted').optional(),
		id: Joi.string().valid('asc', 'desc').optional(),
		price: Joi.string().valid('asc', 'desc').optional(),
	})
	.oxor('id', 'price');
