import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema, createValidator } from 'express-joi-validation';


export const validator = createValidator();

export interface IProductRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Headers]: {
    login: string,
    phone: string,
    password: string
  };
  [ContainerTypes.Body]: {
    products: Array<{
      id: number,
      count: number
    }>
  };
}

export const productHeaderSchema = Joi.object({
  login: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(/^\+\d{10,15}/i).required(),
  password: Joi.string().min(4).max(16).required()
});

export const productBodySchema = Joi.object({
  products: Joi.array().has(Joi.object({
    id: Joi.number().integer().positive().required(),
    count: Joi.number().integer().positive().less(100).required()
  })).required()
});
