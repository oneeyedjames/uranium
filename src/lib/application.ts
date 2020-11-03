import { Server } from 'http';

import express from 'express';
import bodyParser from 'body-parser';

import { Authenticator, AuthFunction } from './authenticator';
import { Database } from './database';

export { Module } from './module';

export class Application {
	protected application: express.Application;
	protected server: Server;

	protected authenticator = new Authenticator();

	private corsHosts: string[] = [];

	get database() { return this._database; }

	constructor(private _database: Database) {
		this.application = express()
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: false }))
		// .use(cookieParser())
		.use(this.enableCors(this.corsHosts))
		.use(this.authenticator.authenticate.bind(this.authenticator));
	}

	public allowCors(host: string|string[]): Application {
		if (typeof host == 'string') this.corsHosts.push(host);
		else this.corsHosts.push(...host);

		return this;
	}

	public authenticate(scheme: string, auth: AuthFunction): Application {
		this.authenticator.register(scheme, auth);
		return this;
	}

	public route(path: string, handler: express.Handler|express.Router): Application {
		this.application.use(path, handler);
		return this;
	}

	public load(modName: string) {
		import(`../mod/${modName}/module`).then((mod) => {
			this.route(`/api`, mod.default(this).router);
		});
	}

	public listen(port: number|string, host: string): Promise<any> {
		port = this.normalizePort(port);
		this.application.set('port', port);

		return new Promise<any>((resolve, reject) => {
			this.server = this.application
			.listen(port as number, host)
			.on('listening', () => resolve(this.server.address()))
			.on('error', (error: Error) => reject(error));
		});
	}

	public close(): Promise<any> {
		if (this.server) {
			return new Promise<any>((resolve) => {
				this.server.close(() => {
					this.server = null;
					resolve();
				});
			});
		} else {
			return Promise.reject(new Error('Server is already closed.'));
		}
	}

	private normalizePort(val: number|string): number|string {
		let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

		return isNaN(port) ? val : port;
	}

	private enableCors(hosts: string[]) {
		return (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) => {
			let origin = req.headers.origin as string;

			if (hosts.indexOf(origin) !== -1)
				res.header('Access-Control-Allow-Origin', origin);

			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
				.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
				.header('Access-Control-Allow-Credentials', 'true')
				.header('Access-Control-Expose-Headers', 'Set-Cookie');

			next();
		};
	}
}
