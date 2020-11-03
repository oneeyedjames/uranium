import { Request, Response } from 'express';

import { Application } from '../lib/application';
import { Resource, Entity, Controller, Model, View, ViewContext } from '../lib/resource';
import { UserIdentity } from '../lib/authenticator';

export interface UserEntity extends Entity, UserIdentity {
	super: boolean;
}

export class UserResource extends Resource<UserEntity> {
	constructor(app: Application) { super(app, 'user', 'users', 'user'); }

	protected initRoutes() {
		this.router.get(`/${this.itemPath}/me`, (req: Request, res: Response) => {
			this.createController(req).getMe()
			.then((data: object) => res.json(data))
			.catch(this.createErrorHandler(res));
		});

		super.initRoutes();
	}

	protected createController(req: Request) {
		let model = this.createModel();
		let view = this.createView(model);

		return new UserController(model, view, req.user as UserEntity);
	}

	protected createModel() {
		return new UserModel(this);
	}

	protected createView(model: Model<UserEntity>) {
		return new UserView(model);
	}
}

export class UserModel extends Model<UserEntity> {
	get schema() { return ['id', 'username', 'password']; }

	async findByUsername(username: string): Promise<UserEntity> {
		let result = await this.search({ username: username });
		if (result.length) return result[0];

		return null;
	}
}

export class UserView extends View<UserEntity> {
	protected getData(user: UserEntity, context: ViewContext) {
		return { id: user.id, username: user.username };
	}
}

export class UserController extends Controller<UserEntity> {
	constructor(
		model: Model<UserEntity>,
		view: View<UserEntity>,
		protected user: UserEntity
	) {
		super(model, view);
	}

	async getMe(): Promise<object> {
		return this.view.build(this.user);
	}
}

export default (app: Application) => new UserResource(app);
