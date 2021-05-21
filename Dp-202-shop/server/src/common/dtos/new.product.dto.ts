import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema, createValidator } from 'express-joi-validation';


export const validator = createValidator();

export interface INewProduct extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        product: Product
    };
}

interface Product {
    vendor_code: number;
    product_name: string;
    manufacture: string;
    category: string;
    unit: string;
    amount: string;
    price: number;
    deleted: boolean;
    ingredients: string;
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export const newProductDto = Joi.object({
    product: Joi.object({ 
    vendor_code: Joi.string().required(),
    product_name: Joi.string().required(),
    manufacture: Joi.string().required(),
    category: Joi.string().required().allow(''),
    unit: Joi.string().required().allow(''),
    amount: Joi.string().min(1).required(),
    price: Joi.number().required(),
    deleted: Joi.boolean().required(),
    ingredients: Joi.string().required().allow(''),
    img: Joi.string().required().allow(''),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    user_id: Joi.number().required()
    })
});

