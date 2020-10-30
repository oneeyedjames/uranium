import { Request, Response, Router } from 'express';

import { HttpError } from './http';
import { Entity } from './database';

import { Controller } from './resource/controller';
export { Controller } from './resource/controller';

import { Model } from './resource/model';
export { Model } from './resource/model';

import { View } from './resource/view';
export { View, ViewContext } from './resource/view';

export abstract class Resource<E extends Entity> {
	private _router: Router;

	get router(): Router {
		if (this._router == null) {
			this._router = Router();
			this.initRoutes();
		}

		return this._router;
	}

	constructor(
		protected basePath: string,
		protected itemPath?: string,
		protected modulePath?: string
	) {
		this.itemPath = itemPath || basePath;
	}

	protected initRoutes() {
		this._router
		.get(`/${this.basePath}`, (req: Request, res: Response) => {
			this.createController(req).getAll()
			.then((entities: E[]) => res.json(entities))
			.catch(this.createErrorHandler(res));
		})
		.get(`/${this.itemPath}/:id`, (req: Request, res: Response) => {
			this.createController(req).getOne(req.params.id)
			.then((entity: E) => res.json(entity))
			.catch(this.createErrorHandler(res));
		})
		.post(`/${this.basePath}`, (req: Request, res: Response) => {
			this.createController(req).create(req.body)
			.then((body: E) => res.status(201).json(body))
			.catch(this.createErrorHandler(res));
		})
		.put(`/${this.itemPath}/:id`, (req: Request, res: Response) => {
			this.createController(req).update(req.params.id, req.body)
			.then((body: E) => res.json(body))
			.catch(this.createErrorHandler(res));
		})
		.delete(`/${this.itemPath}/:id`, (req: Request, res: Response) => {
			this.createController(req).delete(req.params.id)
			.then(() => res.sendStatus(204))
			.catch(this.createErrorHandler(res));
		});
	}

	protected createController(req: Request) {
		let model = this.createModel();
		return new Controller<E>(model, this.createView(model));
	};

	protected abstract createModel(): Model<E>;

	protected createView(model: Model<E>): View<E> {
		return new View<E>(model, this.basePath, this.itemPath, this.modulePath);
	}

	protected createErrorHandler(res: Response): (err: Error) => void {
		return (err: Error) => {
			if (err instanceof HttpError) {
				res.status(err.status).json({
					error: {
						name: err.name,
						message: err.message
					}
				});
			} else {
				res.status(500).json({
					error: {
						name: err.name || 'Error',
						message: err.message || err
					}
				});
			}
		}
	}
}
