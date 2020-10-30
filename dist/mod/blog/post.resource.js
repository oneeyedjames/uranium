"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostView = exports.PostModel = exports.PostResource = void 0;
const resource_1 = require("../../lib/resource");
class PostResource extends resource_1.Resource {
    constructor(db) {
        super('posts', 'post', 'blog');
        this.db = db;
    }
    createModel() {
        return new PostModel(this.db);
    }
    createView(model) {
        return new PostView(model);
    }
}
exports.PostResource = PostResource;
class PostModel extends resource_1.Model {
    get name() { return 'blog_post'; }
    get schema() { return ['id', 'title', 'summary', 'content']; }
}
exports.PostModel = PostModel;
class PostView extends resource_1.View {
    constructor(model) {
        super(model, 'posts', 'post', 'blog');
    }
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
exports.default = (db) => new PostResource(db);
//# sourceMappingURL=post.resource.js.map