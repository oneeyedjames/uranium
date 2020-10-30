import { HttpError } from '../http';
import { Entity } from '../database';
import { Model } from './model';

export type ViewContext = 'list' | 'item';

export class View<E extends Entity> {
	get model() { return this._model; }

	get urlPath(): string {
		return '/api' + (this.modulePath ? `/${this.modulePath}` : '');
	}

	constructor(
		private _model: Model<E>,
		protected basePath: string,
		protected itemPath?: string,
		protected modulePath?: string
	) {}

	build(entity: E): object;
	build(entity: E[]): object;
	build(entity: E|E[]): object {
		if (entity instanceof Array) {
			let data = {
				count: entity.length,
				_links: {
					self: `${this.urlPath}/${this.basePath}`
				},
				_embeds: {}
			}

			data._embeds[this.basePath] = entity.map((item) => {
				return this.sanitize(item, 'list');
			});

			return data;
		} else {
			return this.sanitize(entity, 'item');
		}
	}

	protected sanitize(entity: E, context: ViewContext): object {
		if (!entity) throw new HttpError(404);

		let data = this.getData(entity, context);
		data['_links'] = this.getLinks(entity, context);

		let embeds: object;
		if (embeds = this.getEmbeds(entity, context))
			data['_embedded'] = embeds;

		return data;
	}

	protected getData(entity: E, context: ViewContext): object {
		let data = {};

		this.model.schema.forEach((path: string) => {
			data[path] = entity[path];
		});

		return data;
	}

	protected getLinks(entity: E, context: ViewContext): object {
		return {
			self: {
				href: `${this.urlPath}/${this.itemPath}/${entity.id}`
			}
		};
	}

	protected getEmbeds(entity: E, context: ViewContext): object {
		return null;
	}
}
