import  {BaseError} from './baseError'

export class  NotFound extends BaseError {
    constructor(public error: string) {
        super(404, error);
    }
}
