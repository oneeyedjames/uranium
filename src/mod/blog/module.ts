import { Database, Entity } from '../../lib/database';
import { Resource } from '../../lib/resource';
import { Module } from '../../lib/module';

import PostResource from './post.resource';

export class BlogModule extends Module {
	private _resources: Resource<Entity>[] = [];

	get resources() { return this._resources; }

	constructor(db: Database) {
		super('blog');

		this._resources.push(PostResource(db));
	}
}

export default (db: Database) => new BlogModule(db);
