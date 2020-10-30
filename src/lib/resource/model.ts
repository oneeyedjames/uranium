import { Database, Entity } from '../database';

export abstract class Model<E extends Entity> {
	abstract get name(): string;
	abstract get schema(): string[];

	constructor(private db: Database) {}

	search(args: object): Promise<E[]> {
		return this.db.search<E>(this.name, args);
	}

	find(id: any): Promise<E> {
		return this.db.find<E>(this.name, id);
	}

	save(entity: E): Promise<E> {
		return this.db.save<E>(this.name, entity);
	}

	delete(id: any): Promise<void> {
		return this.db.delete(this.name, id);
	}

	protected beforeSave(entity: E) { return entity; }
	protected afterSave(entity: E) { return entity; }
	protected beforeDelete(entity: E) { return entity; }
	protected afterDelete(entity: E) { return entity; }
}
