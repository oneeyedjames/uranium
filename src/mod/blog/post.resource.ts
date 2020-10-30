import { Database, Entity } from '../../lib/database';
import { Resource, Controller, Model, View, ViewContext } from '../../lib/resource';

export interface PostEntity extends Entity {
	title: string;
	summary: string;
	content: string;
}

export class PostResource extends Resource<PostEntity> {
	constructor(private db: Database) { super('posts', 'post', 'blog'); }

	protected createModel() {
		return new PostModel(this.db);
	}

	protected createView(model: Model<PostEntity>) {
		return new PostView(model);
	}
}

export class PostModel extends Model<PostEntity> {
	get name() { return 'blog_post'; }
	get schema() { return ['id', 'title', 'summary', 'content']; }
}

export class PostView extends View<PostEntity> {
	constructor(model: Model<PostEntity>) {
		super(model, 'posts', 'post', 'blog');
	}

	protected getData(post: PostEntity, context: ViewContext) {
		let data = {
			id: post.id,
			title: post.title,
			summary: post.summary
		};

		if (context == 'item') {
			data['content'] = post.content;
		}

		return data;
	}
}

export default (db: Database) => new PostResource(db);
