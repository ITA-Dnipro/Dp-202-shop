import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema, createValidator } from 'express-joi-validation';


export const validator = createValidator();

export interface INewProduct extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        product: IProduct
    };
}

export interface IProduct {
    vendor_code: number;
    product_name: string;
    manufacture: string;
    category: string;
    unit: string;
    amount: string;
    price: number;
    deleted: boolean;
    ingredients?: string;
    img?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user_id: number;
}


export const newProductDto = Joi.object({
    product: Joi.object({
    vendor_code: Joi.string().required(),
    product_name: Joi.string().required(),
    manufacture: Joi.string().required(),
    category: Joi.string().required(),
    unit: Joi.string().required(),
    amount: Joi.string().min(1).required(),
    price: Joi.number().required(),
    deleted: Joi.boolean().required(),
    ingredients: Joi.string(),
    img: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    user_id: Joi.number().required()
    })
});

