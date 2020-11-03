"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.RoleResource = void 0;
const resource_1 = require("../lib/resource");
class RoleResource extends resource_1.Resource {
    constructor(app) { super(app, 'role', 'roles', 'role'); }
    createModel() {
        return new RoleModel(this);
    }
}
exports.RoleResource = RoleResource;
class RoleModel extends resource_1.Model {
    get schema() { return ['id', 'title', 'summary']; }
}
exports.RoleModel = RoleModel;
exports.default = (app) => new RoleResource(app);
//# sourceMappingURL=role.resource.js.map