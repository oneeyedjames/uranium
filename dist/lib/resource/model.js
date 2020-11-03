"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(_resource) {
        this._resource = _resource;
    }
    get name() { return this.resource.name; }
    get resource() { return this._resource; }
    get database() { return this.resource.application.database; }
    search(args) {
        return this.database.search(this.name, args);
    }
    find(id) {
        return this.database.find(this.name, id);
    }
    save(entity) {
        return this.database.save(this.name, entity);
    }
    delete(id) {
        return this.database.delete(this.name, id);
    }
    beforeSave(entity) { return entity; }
    afterSave(entity) { return entity; }
    beforeDelete(entity) { return entity; }
    afterDelete(entity) { return entity; }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map