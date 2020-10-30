import { Router } from 'express';

import { Resource } from './resource';
import { Entity } from './database';

export abstract class Module {
	private _router: Router;

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

	constructor(private path: string) {}
}
