import jwt from 'jsonwebtoken';

import { Application } from '../lib/application';

import { UserResource, UserEntity, UserModel } from './user.resource';

export default (app: Application) => {
	return async (token: string): Promise<UserEntity> => {
		let payload = jwt.decode(token);

		let res = new UserResource(app);
		let model = new UserModel(res);

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
