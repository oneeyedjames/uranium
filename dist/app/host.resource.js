"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostModel = exports.HostResource = void 0;
const resource_1 = require("../lib/resource");
class HostResource extends resource_1.Resource {
    constructor(app) { super(app, 'host', 'hosts', 'host'); }
    createModel() {
        return new HostModel(this);
    }
}
exports.HostResource = HostResource;
class HostModel extends resource_1.Model {
    get schema() { return ['id', 'title', 'summary']; }
}
exports.HostModel = HostModel;
exports.default = (app) => new HostResource(app);
//# sourceMappingURL=host.resource.js.map