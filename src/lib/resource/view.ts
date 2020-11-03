import { HttpError } from '../http';
import { Entity, Model } from '../resource';

export type ViewContext = 'list' | 'item';

export class View<E extends Entity> {
	get model() { return this._model; }
	get resource() { return this.model.resource; }

	get urlPath() {
		let path = '/api';

		if (this.resource.module)
			path += `/${this.resource.module.path}`;

		return path;
	}

	get basePath() { return this.resource.basePath; }
	get itemPath() { return this.resource.itemPath; }

	constructor(private _model: Model<E>) {}

	build(entity: E): object;
	build(entity: E[]): object;
	build(entity: E|E[]): object {
		if (entity instanceof Array) {
			let data = {
				count: entity.length,
				_links: {
					self: {
						href: `${this.urlPath}/${this.basePath}`
					}
				},
				_embedded: {}
			};

			data._embedded[this.basePath] = entity.map((item) => {
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

		this.model.schema.forEach((field: string) => {
			data[field] = entity[field];
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
