import { readdir } from 'fs';
import { join } from 'path';

import { Application } from '../lib/application';
import { Database } from '../lib/database';

import basicAuth from './basic.authenticator';
import jwtAuth from './jwt.authenticator';

import HostResource from './host.resource';
import UserResource from './user.resource';
import RoleResource from './role.resource';

export class RestApplication extends Application {
	constructor(db: Database) {
		super(db);

		this.authenticate('JWT', jwtAuth(this))
		.authenticate('Basic', basicAuth(this))
		.route('/api', HostResource(this).router)
		.route('/api', UserResource(this).router)
		.route('/api', RoleResource(this).router);

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
