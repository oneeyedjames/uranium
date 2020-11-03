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

		['blog'].forEach(this.load.bind(this));
	}
}

export default (db: Database) => new RestApplication(db);
