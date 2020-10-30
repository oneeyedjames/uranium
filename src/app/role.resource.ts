import { Request } from 'express';

import { Database, Entity } from '../lib/database';
import { Resource, Model } from '../lib/resource';

export interface RoleEntity extends Entity {
	title: string;
	summary: string;
}

export class RoleResource extends Resource<RoleEntity> {
	constructor(private db: Database) { super('roles', 'role'); }

	protected createModel() {
		return new RoleModel(this.db);
	}
}

export class RoleModel extends Model<RoleEntity> {
	get name() { return 'role'; }
	get schema() { return ['id', 'title', 'summary']; }
}

export default (db: Database) => new RoleResource(db);
