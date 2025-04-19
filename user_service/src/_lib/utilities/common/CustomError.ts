export class CustomError extends Error {
	statusCode: number;

	constructor(message: string, statusCode = 500) {
		super(message);
		this.statusCode = statusCode;
		// Maintains proper stack trace
		Error.captureStackTrace(this, this.constructor);
	}
}
