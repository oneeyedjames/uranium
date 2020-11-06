import { Request, Response, Router } from 'express';

import { HttpError } from './http';
import { Entity } from './database';
export { Entity } from './database';

import { Application, Module } from './application';

import { Controller } from './resource/controller';
export { Controller } from './resource/controller';

import { Model } from './resource/model';
export { Model } from './resource/model';

import { View } from './resource/view';
export { View, ViewContext } from './resource/view';

export abstract class Resource<E extends Entity> {
	private _application: Application;
	private _module: Module;
	private _router: Router;

	get name() {
		return this._module ? `${this._module.name}_${this._name}` : this._name;
	}

	get basePath() { return this._basePath || this._name; }
	get itemPath() { return this._itemPath || this.basePath; }

	get application() { return this._application; }
	get module() { return this._module; }

	get router(): Router {
		if (this._router == null) {
			this._router = Router();
			this.initRoutes();
		}

		return this._router;
	}

	constructor(
		app: Application | Module,
		protected _name: string,
		protected _basePath?: string,
		protected _itemPath?: string
	) {
		if (app instanceof Application) {
			this._application = app;
			this._module = null;
		} else {
			this._application = app.application;
			this._module = app;
		}
	}

	protected initRoutes() {
		this._router
		.get(`/${this.basePath}`, (req: Request, res: Response) => {
			this.createController(req).getAll()
			.then((output: object) => res.json(output))
			.catch(this.createErrorHandler(res));
		})
		.get(`/${this.itemPath}/:id`, (req: Request, res: Response) => {
			this.createController(req).getOne(req.params.id)
			.then((output: object) => res.json(output))
			.catch(this.createErrorHandler(res));
		})
		.post(`/${this.basePath}`, (req: Request, res: Response) => {
			this.createController(req).create(req.body)
			.then((output: object) => res.status(201).json(output))
			.catch(this.createErrorHandler(res));
		})
		.put(`/${this.itemPath}/:id`, (req: Request, res: Response) => {
			this.createController(req).update(req.params.id, req.body)
			.then((output: object) => res.json(output))
			.catch(this.createErrorHandler(res));
		})
		.delete(`/${this.itemPath}/:id`, (req: Request, res: Response) => {
			this.createController(req).delete(req.params.id)
			.then(() => res.sendStatus(204))
			.catch(this.createErrorHandler(res));
		});
	}

	protected abstract createModel(): Model<E>;

	protected createView(model: Model<E>): View<E> {
		return new View<E>(model);
	}

	protected createController(req: Request) {
		let model = this.createModel();
		let view = this.createView(model);
		return new Controller<E>(model, view, req.user);
	}

	protected createErrorHandler(res: Response): (err: Error) => void {
		return (err: Error) => {
			console.log(err);

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
