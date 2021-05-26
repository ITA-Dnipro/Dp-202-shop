export interface IError {
	message: string;
	data?: any[];
	status?: number;
	error: any;
}

export class BaseError extends Error {
	constructor(public statusCode: number, public error: string) {
		super();
		this.statusCode = statusCode;
		this.error = error;
	}
}
