import  {BaseError} from './baseError'

export class CustomError extends BaseError {
    constructor(public data: any[], public error: string) {
        super(200, error);
        this.data = data;
    }
}
