import { Application } from '../lib/application';
import { Resource, Entity, Model } from '../lib/resource';

export interface RoleEntity extends Entity {
	title: string;
	summary: string;
}

export class RoleResource extends Resource<RoleEntity> {
	constructor(app: Application) { super(app, 'role', 'roles', 'role'); }

	protected createModel() {
		return new RoleModel(this);
	}
}

export class RoleModel extends Model<RoleEntity> {
	get schema() { return ['id', 'title', 'summary']; }
}

export default (app: Application) => new RoleResource(app);
