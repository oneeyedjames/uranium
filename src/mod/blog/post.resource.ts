import { Resource, Entity, Model, View, ViewContext } from '../../lib/resource';

import { BlogModule } from './module';

export interface PostEntity extends Entity {
	title: string;
	summary: string;
	content: string;
}

export class PostResource extends Resource<PostEntity> {
	constructor(mod: BlogModule) { super(mod, 'post', 'posts', 'post'); }

	protected createModel() {
		return new PostModel(this);
	}

	protected createView(model: Model<PostEntity>) {
		return new PostView(model);
	}
}

export class PostModel extends Model<PostEntity> {
	get schema() { return ['id', 'title', 'summary', 'content']; }
}

export class PostView extends View<PostEntity> {
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

export default (mod: BlogModule) => new PostResource(mod);
