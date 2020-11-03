"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const http_1 = require("../http");
class View {
    constructor(_model) {
        this._model = _model;
    }
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
    build(entity) {
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
        }
        else {
            return this.sanitize(entity, 'item');
        }
    }
    sanitize(entity, context) {
        if (!entity)
            throw new http_1.HttpError(404);
        let data = this.getData(entity, context);
        data['_links'] = this.getLinks(entity, context);
        let embeds;
        if (embeds = this.getEmbeds(entity, context))
            data['_embedded'] = embeds;
        return data;
    }
    getData(entity, context) {
        let data = {};
        this.model.schema.forEach((field) => {
            data[field] = entity[field];
        });
        return data;
    }
    getLinks(entity, context) {
        return {
            self: {
                href: `${this.urlPath}/${this.itemPath}/${entity.id}`
            }
        };
    }
    getEmbeds(entity, context) {
        return null;
    }
}
exports.View = View;
//# sourceMappingURL=view.js.map