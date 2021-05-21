export interface IError {
    name: string;
    message: string;
    data?: any[];
}

export class BaseError extends Error {
    constructor(public statusCode: number, public error: string) {
        super();
        this.statusCode = statusCode;
        this.error = error;
    }
}
