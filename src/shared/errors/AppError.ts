export default class AppError {
	public readonly message: string;
	public readonly statusCode: number;

	constructor({
		message,
		statusCode = 400,
	}: {
		message: string;
		statusCode?: number;
	}) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
