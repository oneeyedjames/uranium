import { Database, Entity } from '../lib/database';
import { Resource, Model } from '../lib/resource';

export interface HostEntity extends Entity {
	title: string;
	summary: string;
}

export class HostResource extends Resource<HostEntity> {
	constructor(private db: Database) { super('hosts', 'host'); }

	protected createModel() {
		return new HostModel(this.db);
	}
}

export class HostModel extends Model<HostEntity> {
	get name() { return 'host'; }
	get schema() { return ['id', 'title', 'summary']; }
}

export default (db: Database) => new HostResource(db);
