"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = exports.View = exports.Model = exports.Controller = void 0;
const express_1 = require("express");
const http_1 = require("./http");
const controller_1 = require("./resource/controller");
var controller_2 = require("./resource/controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return controller_2.Controller; } });
var model_1 = require("./resource/model");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return model_1.Model; } });
const view_1 = require("./resource/view");
var view_2 = require("./resource/view");
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return view_2.View; } });
class Resource {
    constructor(basePath, itemPath, modulePath) {
        this.basePath = basePath;
        this.itemPath = itemPath;
        this.modulePath = modulePath;
        this.itemPath = itemPath || basePath;
    }
    get router() {
        if (this._router == null) {
            this._router = express_1.Router();
            this.initRoutes();
        }
        return this._router;
    }
    initRoutes() {
        this._router
            .get(`/${this.basePath}`, (req, res) => {
            this.createController(req).getAll()
                .then((entities) => res.json(entities))
                .catch(this.createErrorHandler(res));
        })
            .get(`/${this.itemPath}/:id`, (req, res) => {
            this.createController(req).getOne(req.params.id)
                .then((entity) => res.json(entity))
                .catch(this.createErrorHandler(res));
        })
            .post(`/${this.basePath}`, (req, res) => {
            this.createController(req).create(req.body)
                .then((body) => res.status(201).json(body))
                .catch(this.createErrorHandler(res));
        })
            .put(`/${this.itemPath}/:id`, (req, res) => {
            this.createController(req).update(req.params.id, req.body)
                .then((body) => res.json(body))
                .catch(this.createErrorHandler(res));
        })
            .delete(`/${this.itemPath}/:id`, (req, res) => {
            this.createController(req).delete(req.params.id)
                .then(() => res.sendStatus(204))
                .catch(this.createErrorHandler(res));
        });
    }
    createController(req) {
        let model = this.createModel();
        return new controller_1.Controller(model, this.createView(model));
    }
    ;
    createView(model) {
        return new view_1.View(model, this.basePath, this.itemPath, this.modulePath);
    }
    createErrorHandler(res) {
        return (err) => {
            if (err instanceof http_1.HttpError) {
                res.status(err.status).json({
                    error: {
                        name: err.name,
                        message: err.message
                    }
                });
            }
            else {
                res.status(500).json({
                    error: {
                        name: err.name || 'Error',
                        message: err.message || err
                    }
                });
            }
        };
    }
}
exports.Resource = Resource;
//# sourceMappingURL=resource.js.map