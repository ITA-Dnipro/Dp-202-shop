import  {BaseError} from './baseError'

export class Forbidden extends BaseError {
    constructor( public error: string) {
        super(403, error);
    }
}
