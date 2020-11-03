import { Router } from 'express';

import { Application } from './application';
import { Resource, Entity } from './resource';

export abstract class Module {
	private _router: Router;

	get name() { return this._name; }
	get path() { return this._path || this.name; }

	get application() { return this._application; }
	abstract get resources(): Resource<Entity>[];

	get router(): Router {
		if (this._router == null) {
			this._router = Router();
			this.resources.forEach((res: Resource<Entity>) => {
				this._router.use(`/${this.path}`, res.router);
			});
		}

		return this._router;
	}

	constructor(
		private _application: Application,
		private _name: string,
		private _path?: string
	) {}
}
