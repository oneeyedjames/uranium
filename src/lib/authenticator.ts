import { Request, Response, NextFunction } from 'express';

declare module 'express' {
	interface Request {
		user?: UserIdentity
	}
}

export interface UserIdentity {
	username: string;
	password: string;
}

export interface AuthFunction {
	(token: string): Promise<UserIdentity>;
}

export class Authenticator {
	private handlers = {};

	public register(scheme: string, authenticate: AuthFunction) {
		this.handlers[scheme.toLowerCase()] = authenticate;
	}

	public authenticate(req: Request, res: Response, next: NextFunction) {
		let header = req.header('Authorization');
		if (header) {
			let scheme: string, token: string;
			[scheme, token] = header.split(' ', 2);

			let auth: AuthFunction;
			if (auth = this.handlers[scheme.toLowerCase()]) {
			    auth(token)
				.then((user: UserIdentity) => req.user = user)
				.catch((err) => console.error(err.message || err))
				.finally(next);
			} else {
				next();
			}
		} else {
			next();
		}
	}
}
