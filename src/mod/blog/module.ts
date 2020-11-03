import { Application, Module } from '../../lib/application';
import { Resource, Entity } from '../../lib/resource';

import PostResource from './post.resource';

export class BlogModule extends Module {
	private _resources: Resource<Entity>[];

	get resources() { return this._resources; }

	constructor(app: Application) {
		super(app, 'blog');

		this._resources = [PostResource(this)];
	}
}

export default (app: Application) => new BlogModule(app);
