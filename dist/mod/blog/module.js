"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const application_1 = require("../../lib/application");
const post_resource_1 = __importDefault(require("./post.resource"));
class BlogModule extends application_1.Module {
    constructor(app) {
        super(app, 'blog');
        this._resources = [post_resource_1.default(this)];
    }
    get resources() { return this._resources; }
}
exports.BlogModule = BlogModule;
exports.default = (app) => new BlogModule(app);
//# sourceMappingURL=module.js.map