export class HttpError extends Error {
	public constructor(public status: number, message?: string) {
		super(message || httpStatusMessage(status));
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = 'HttpError';
	}
}

export function httpStatusMessage(status: number): string {
	switch(status) {
		case 401:
			return 'Unauthorized';
		case 404:
			return 'Not Found';
		case 500:
		default:
			return 'Internal Server Error';
	}
}
