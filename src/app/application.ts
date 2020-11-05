import { readdir } from 'fs';
import { join } from 'path';

import { Router, Request, Response } from 'express';

import { Application } from '../lib/application';
import { Database } from '../lib/database';

import createBasicAuth from './basic.authenticator';
import createJwtAuth from './jwt.authenticator';

import HostResource from './host.resource';
import UserResource from './user.resource';
import RoleResource from './role.resource';

export class RestApplication extends Application {
	constructor(db: Database) {
		super(db);

		let basicAuth = createBasicAuth(this);
		let jwtAuth = createJwtAuth(this);

		this.authenticate('JWT', jwtAuth.authenticate)
		.authenticate('Basic', basicAuth.authenticate)
		.route('/api', HostResource(this).router)
		.route('/api', UserResource(this).router)
		.route('/api', RoleResource(this).router);

		this.route('/api', Router()
		.post('/login', (req: Request, res: Response) => {
			basicAuth.login(req.body.username, req.body.password)
			.then((user) => jwtAuth.generate(user))
			.then((token: string) => res.json({ token: token }))
			.catch((err) => res.status(401).json({
				error: {
					name: err.name || 'Error',
					message: err.message || err
				}
			}));
		}));

		this.authenticator.acceptCookies('auth');

		let path = join(__dirname, '../mod');

		readdir(path, { withFileTypes: true }, (err, files) => {
			if (err) return console.log(err);

			for (let file of files) {
				if (file.isDirectory()) {
					this.load(join(path, file.name));
				}
			}
		});
	}
}

export default (db: Database) => new RestApplication(db);
