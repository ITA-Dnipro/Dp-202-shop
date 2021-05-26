import  {BaseError} from './baseError';

 export class  Unauthorized extends BaseError {
     constructor(public error: string) {
         super(401, error);
     }
 } 