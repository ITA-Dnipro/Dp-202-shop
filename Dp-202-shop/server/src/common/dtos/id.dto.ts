import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema, createValidator } from 'express-joi-validation';
export const validator = createValidator();

export interface IId extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: number
    };
}

export const idDto = Joi.object().keys({
    id: Joi.string().pattern(/^[0-9]+$/).required()
});

