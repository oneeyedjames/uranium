"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostView = exports.PostModel = exports.PostResource = void 0;
const resource_1 = require("../../lib/resource");
class PostResource extends resource_1.Resource {
    constructor(mod) { super(mod, 'post', 'posts', 'post'); }
    createModel() {
        return new PostModel(this);
    }
    createView(model) {
        return new PostView(model);
    }
}
exports.PostResource = PostResource;
class PostModel extends resource_1.Model {
    get schema() { return ['id', 'title', 'summary', 'content']; }
}
exports.PostModel = PostModel;
class PostView extends resource_1.View {
    getData(post, context) {
        let data = {
            id: post.id,
            title: post.title,
            summary: post.summary
        };
        if (context == 'item') {
            data['content'] = post.content;
        }
        return data;
    }
}
exports.PostView = PostView;
exports.default = (mod) => new PostResource(mod);
//# sourceMappingURL=post.resource.js.map