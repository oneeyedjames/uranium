import { Resource, Entity } from '../resource';

export abstract class Model<E extends Entity> {
	get name() { return this.resource.name; }
	abstract get schema(): string[];

	get resource() { return this._resource; }
	get database() { return this.resource.application.database; }

	constructor(private _resource: Resource<E>) {}

	search(args: object): Promise<E[]> {
		return this.database.search<E>(this.name, args);
	}

	find(id: any): Promise<E> {
		return this.database.find<E>(this.name, id);
	}

	save(entity: E): Promise<E> {
		return this.database.save<E>(this.name, entity);
	}

	delete(id: any): Promise<void> {
		return this.database.delete(this.name, id);
	}

	protected beforeSave(entity: E) { return entity; }
	protected afterSave(entity: E) { return entity; }
	protected beforeDelete(entity: E) { return entity; }
	protected afterDelete(entity: E) { return entity; }
}
