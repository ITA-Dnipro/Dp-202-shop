export class ApiError extends Error {

  constructor(public status: number, public message: string) {
    super();
  }

  static badRequest(message: string): ApiError {
    return new ApiError(404,  message);
  }

  static internal(message): ApiError {
    return new ApiError(500, message)
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(401, message);
  }
}
