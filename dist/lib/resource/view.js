"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const http_1 = require("../http");
class View {
    constructor(_model, basePath, itemPath, modulePath) {
        this._model = _model;
        this.basePath = basePath;
        this.itemPath = itemPath;
        this.modulePath = modulePath;
    }
    get model() { return this._model; }
    get urlPath() {
        return '/api' + (this.modulePath ? `/${this.modulePath}` : '');
    }
    build(entity) {
        if (entity instanceof Array) {
            let data = {
                count: entity.length,
                _links: {
                    self: `${this.urlPath}/${this.basePath}`
                },
                _embeds: {}
            };
            data._embeds[this.basePath] = entity.map((item) => {
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
        this.model.schema.forEach((path) => {
            data[path] = entity[path];
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