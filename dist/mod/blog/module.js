"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const module_1 = require("../../lib/module");
const post_resource_1 = __importDefault(require("./post.resource"));
class BlogModule extends module_1.Module {
    constructor(db) {
        super('blog');
        this._resources = [];
        this._resources.push(post_resource_1.default(db));
    }
    get resources() { return this._resources; }
}
exports.BlogModule = BlogModule;
exports.default = (db) => new BlogModule(db);
//# sourceMappingURL=module.js.map