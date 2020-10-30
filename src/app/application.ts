import { Application } from '../lib/application';
import { Database } from '../lib/database';

import basicAuth from './basic.authenticator';
import jwtAuth from './jwt.authenticator';

import HostResource from './host.resource';
import UserResource from './user.resource';
import RoleResource from './role.resource';

export default (db: Database) => {
	let app = new Application(db)
	.authenticate('Basic', basicAuth(db))
	.authenticate('JWT', jwtAuth(db))
	.route('/api', HostResource(db).router)
	.route('/api', UserResource(db).router)
	.route('/api', RoleResource(db).router);

	['blog'].forEach((modName: string) => {
		import(`../mod/${modName}/module`).then((mod) => {
			app.route(`/api`, mod.default(db).router);
		});
	});

	return app;
}
