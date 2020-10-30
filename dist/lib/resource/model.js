"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(db) {
        this.db = db;
    }
    search(args) {
        return this.db.search(this.name, args);
    }
    find(id) {
        return this.db.find(this.name, id);
    }
    save(entity) {
        return this.db.save(this.name, entity);
    }
    delete(id) {
        return this.db.delete(this.name, id);
    }
    beforeSave(entity) { return entity; }
    afterSave(entity) { return entity; }
    beforeDelete(entity) { return entity; }
    afterDelete(entity) { return entity; }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map