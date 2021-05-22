import  {BaseError} from './baseError'

export class NotAcceptable extends BaseError {
    constructor( public error: string) {
        super(406, error);
    }
}
