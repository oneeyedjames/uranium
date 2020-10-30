import jwt from 'jsonwebtoken';

import { Database } from '../lib/database';

import { UserEntity, UserModel } from './user.resource';

export default (db: Database) => {
	return async (token: string): Promise<UserEntity> => {
		let payload = jwt.decode(token);

		let model = new UserModel(db);

		let user: UserEntity;
		if (user = await model.find(payload['usr'])) {
			jwt.verify(token, user.password, (err) => {
				if (err) throw new Error('Invalid Password');
			});

			return user;
		} else {
			throw new Error('Invalid Username');
		}
	};
}
