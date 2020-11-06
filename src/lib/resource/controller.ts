import { HttpError } from '../http';
import { Entity, Model, View } from '../resource';
import { UserIdentity } from '../authenticator';

export class Controller<E extends Entity> {
	get model() { return this._model; }
	get view() { return this._view; }
	get user() { return this._user; }

	constructor(
		private _model: Model<E>,
		private _view: View<E>,
		private _user: UserIdentity
	) {}

	async getAll(): Promise<object> {
		if (!this.canRead()) throw new HttpError(401);

		let result = await this.model.search({});
		return this.view.build(result);
	}

	async getOne(id: any): Promise<object> {
		if (!this.canRead()) throw new HttpError(401);

		let entity = await this.model.find(id);

		if (!this.canRead(entity)) throw new HttpError(401);

		return this.view.build(entity);
	}

	async create(data: any): Promise<object> {
		if (!this.canCreate()) throw new HttpError(401);

		let entity = this.parse(data);
		entity = await this.model.save(entity);
		return this.view.build(entity);
	}

	async update(id: any, data: any): Promise<object> {
		let entity = await this.model.find(id);

		if (!this.canUpdate(entity)) throw new HttpError(401);

		entity = this.parse(data, entity);
		entity = await this.model.save(entity);
		return this.view.build(entity);
	}

	async delete(id: any): Promise<void> {
		let entity = await this.model.find(id);

		if (!this.canDelete(entity)) throw new HttpError(401);

		await this.model.delete(entity.id);
	}

	protected canRead(entity?: E): boolean { return true; }
	protected canCreate(): boolean { return true; }
	protected canUpdate(entity: E): boolean { return true; }
	protected canDelete(entity: E): boolean { return true; }

	protected parse(data: any, entity?: E): E {
		entity = entity || { id: null } as E;

		this.model.schema.forEach((field: string) => {
			if (data[field]) entity[field] = data[field];
		});

		return entity;
	}
}
