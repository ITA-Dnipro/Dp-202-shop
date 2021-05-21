import  {BaseError} from './baseError'

export class  NotFoundData extends BaseError {
    constructor(public data: any[], public error: string) {
        super(404, error);
        this.data = data;
    }
}
