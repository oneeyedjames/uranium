import jwt from 'jsonwebtoken';

import { Application, AuthFunction } from '../lib/application';

import { UserResource, UserEntity, UserModel } from './user.resource';

export class JWTAuthenticator {
	authenticate: AuthFunction = async (token: string) => {
		return this.validate(token);
	};

	constructor(private app: Application) {}

	async validate(token: string): Promise<UserEntity> {
		let res = new UserResource(this.app);
		let model = new UserModel(res);

		let payload = jwt.decode(token);

		let user: UserEntity;
		if (user = await model.findByUsername(payload['usr'])) {
			jwt.verify(token, user.password, (err) => {
				if (err) throw new Error('Invalid Password');
			});

			return user;
		} else {
			throw new Error('Invalid Username');
		}
	}

	async generate(user: UserEntity) {
		return await jwt.sign({ usr: user.username }, user.password);
	}
}

export default (app: Application) => new JWTAuthenticator(app);
