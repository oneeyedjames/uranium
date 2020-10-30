"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const express_1 = require("express");
class Module {
    constructor(path) {
        this.path = path;
    }
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