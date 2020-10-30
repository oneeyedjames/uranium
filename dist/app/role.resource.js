"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.RoleResource = void 0;
const resource_1 = require("../lib/resource");
class RoleResource extends resource_1.Resource {
    constructor(db) {
        super('roles', 'role');
        this.db = db;
    }
    createModel() {
        return new RoleModel(this.db);
    }
}
exports.RoleResource = RoleResource;
class RoleModel extends resource_1.Model {
    get name() { return 'role'; }
    get schema() { return ['id', 'title', 'summary']; }
}
exports.RoleModel = RoleModel;
exports.default = (db) => new RoleResource(db);
//# sourceMappingURL=role.resource.js.map