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
	private cookie: string;
	private handlers = {};

	public acceptCookies(name: string) {
		this.cookie = name;
	}

	public register(scheme: string, authenticate: AuthFunction) {
		this.handlers[scheme.toLowerCase()] = authenticate;
	}

	public authenticate(req: Request, res: Response, next: NextFunction) {
		let token = req.cookies[this.cookie] || req.header('Authorization');
		if (token) {
			this.handle(token)
			.then((user: UserIdentity) => req.user = user)
			.catch((err) => console.error(err.message || err))
			.finally(next);
		} else {
			next();
		}
	}

	protected async handle(token: string): Promise<UserIdentity> {
		let scheme: string;
		[scheme, token] = token.split(' ', 2);

		let auth: AuthFunction;
		if (auth = this.handlers[scheme.toLowerCase()]) {
			return await auth(token);
		} else {
			throw new Error(`No handler for scheme: ${scheme}`);
		}
	}
}
