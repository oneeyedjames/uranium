import bcrypt from 'bcrypt';

import { Database } from '../lib/database';

import { UserEntity, UserModel } from './user.resource';

export default (db: Database) => {
	return async (token: string) => {
		let raw = Buffer.from(token, 'base64').toString('utf8');

		let username = '', password = '';
		[username, password] = raw.split(':', 2);

		let model = new UserModel(db);

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
