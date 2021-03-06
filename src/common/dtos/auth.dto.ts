import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

export const validator = createValidator();

export const authDto = Joi.object({
	login: Joi.string().min(2).max(50).required(),
	password: Joi.string().min(4).max(16).required(),
});
