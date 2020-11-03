"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const express_1 = require("express");
class Module {
    constructor(_application, _name, _path) {
        this._application = _application;
        this._name = _name;
        this._path = _path;
    }
    get name() { return this._name; }
    get path() { return this._path || this.name; }
    get application() { return this._application; }
    get router() {
        if (this._router == null) {
            this._router = express_1.Router();
            this.resources.forEach((res) => {
                this._router.use(`/${this.path}`, res.router);
            });
        }
        return this._router;
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map