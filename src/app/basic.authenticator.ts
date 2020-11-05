import bcrypt from 'bcrypt';

import { Application, AuthFunction } from '../lib/application';

import { UserResource, UserEntity, UserModel } from './user.resource';

export class BasicAuthenticator {
	authenticate: AuthFunction = async (token: string) => {
		let raw = Buffer.from(token, 'base64').toString('utf8');

		let username = '', password = '';
		[username, password] = raw.split(':', 2);

		return await this.login(username, password);
	};

	constructor(private app: Application) {}

	async login(username: string, password: string): Promise<UserEntity> {
		let res = new UserResource(this.app);
		let model = new UserModel(res);

		let user: UserEntity;
		if (user = await model.findByUsername(username)) {
			if (await bcrypt.compare(password, user.password)) return user;
			else throw new Error('Invalid Password');
		} else {
			throw new Error('Invalid Username');
		}
	}
}

export default (app: Application) => new BasicAuthenticator(app);
