"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostModel = exports.HostResource = void 0;
const resource_1 = require("../lib/resource");
class HostResource extends resource_1.Resource {
    constructor(db) {
        super('hosts', 'host');
        this.db = db;
    }
    createModel() {
        return new HostModel(this.db);
    }
}
exports.HostResource = HostResource;
class HostModel extends resource_1.Model {
    get name() { return 'host'; }
    get schema() { return ['id', 'title', 'summary']; }
}
exports.HostModel = HostModel;
exports.default = (db) => new HostResource(db);
//# sourceMappingURL=host.resource.js.map