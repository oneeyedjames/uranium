"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const http_1 = require("../http");
class Controller {
    constructor(_model, _view, _user) {
        this._model = _model;
        this._view = _view;
        this._user = _user;
    }
    get model() { return this._model; }
    get view() { return this._view; }
    get user() { return this._user; }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.canRead())
                throw new http_1.HttpError(401);
            let result = yield this.model.search({});
            return this.view.build(result);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.canRead())
                throw new http_1.HttpError(401);
            let entity = yield this.model.find(id);
            if (!this.canRead(entity))
                throw new http_1.HttpError(401);
            return this.view.build(entity);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.canCreate())
                throw new http_1.HttpError(401);
            let entity = this.parse(data);
            entity = yield this.model.save(entity);
            return this.view.build(entity);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity = yield this.model.find(id);
            if (!this.canUpdate(entity))
                throw new http_1.HttpError(401);
            entity = this.parse(data, entity);
            entity = yield this.model.save(entity);
            return this.view.build(entity);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity = yield this.model.find(id);
            if (!this.canDelete(entity))
                throw new http_1.HttpError(401);
            yield this.model.delete(entity.id);
        });
    }
    canRead(entity) { return true; }
    canCreate() { return true; }
    canUpdate(entity) { return true; }
    canDelete(entity) { return true; }
    parse(data, entity) {
        entity = entity || { id: null };
        this.model.schema.forEach((field) => {
            if (data[field])
                entity[field] = data[field];
        });
        return entity;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map