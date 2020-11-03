import bcrypt from 'bcrypt';

import { Application } from '../lib/application';

import { UserResource, UserEntity, UserModel } from './user.resource';

export default (app: Application) => {
	return async (token: string) => {
		let raw = Buffer.from(token, 'base64').toString('utf8');

		let username = '', password = '';
		[username, password] = raw.split(':', 2);

		let res = new UserResource(app);
		let model = new UserModel(res);

		let user: UserEntity;
		if (user = await model.findByUsername(username)) {
			if (await bcrypt.compare(password, user.password)) {
				return user;
			} else {
				throw new Error('Invalid Password');
			}
		} else {
			throw new Error('Invalid Username');
		}
	};
}
