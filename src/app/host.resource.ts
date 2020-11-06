import { Application } from '../lib/application';
import { Resource, Entity, Model } from '../lib/resource';

export interface HostEntity extends Entity {
	title: string;
	summary: string;
	default: boolean;
	domain: string;
}

export class HostResource extends Resource<HostEntity> {
	constructor(app: Application) { super(app, 'host', 'hosts', 'host'); }

	protected createModel() {
		return new HostModel(this);
	}
}

export class HostModel extends Model<HostEntity> {
	get schema() { return ['id', 'title', 'summary']; }
}

export default (app: Application) => new HostResource(app);
