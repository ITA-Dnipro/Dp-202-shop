export class ApiError extends Error {

  constructor(public status: number, public message: string, public data: any[],) {
    super();
    this.data = data;
  }

  static badRequest(message: string, data: any[],): ApiError {
    return new ApiError(404, message, data);
  }

  static internal(message: string, data: any[]): ApiError {
    return new ApiError(500, message, data)
  }

  static unauthorized(data: any[], message: string): ApiError {
    return new ApiError(401, message, data);
  }

}
