import * as Joi from 'joi';
import {
	ValidatedRequestSchema,
	createValidator,
} from 'express-joi-validation';

export const validator = createValidator();

export interface ISearchParams extends ValidatedRequestSchema {
	categories?: string;
	manufactures?: string;
	products?: string;
}

export const searchParamsDto = Joi.object()
	.keys({
		categories: Joi.string().pattern(/^[0-9,]+$/),
		manufactures: Joi.string(),
		products: Joi.string(),
	})
	.unknown(true);
