"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = exports.UserModel = exports.UserController = exports.UserResource = void 0;
const resource_1 = require("../lib/resource");
class UserResource extends resource_1.Resource {
    constructor(db) {
        super('users', 'user');
        this.db = db;
    }
    initRoutes() {
        this.router.get(`/${this.itemPath}/me`, (req, res) => {
            this.createController(req).getMe()
                .then((data) => res.json(data))
                .catch(this.createErrorHandler(res));
        });
        super.initRoutes();
    }
    createController(req) {
        let model = this.createModel();
        let view = this.createView(model);
        return new UserController(model, view, req.user);
    }
    createModel() {
        return new UserModel(this.db);
    }
    createView(model) {
        return new UserView(model);
    }
}
exports.UserResource = UserResource;
class UserController extends resource_1.Controller {
    constructor(model, view, user) {
        super(model, view);
        this.user = user;
    }
    getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.view.build(this.user);
        });
    }
}
exports.UserController = UserController;
class UserModel extends resource_1.Model {
    get name() { return 'user'; }
    get schema() { return ['id', 'username', 'password']; }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.search({ username: username });
            if (result.length)
                return result[0];
            return null;
        });
    }
}
exports.UserModel = UserModel;
class UserView extends resource_1.View {
    constructor(model) {
        super(model, 'users', 'user');
    }
    getData(user, context) {
        return { id: user.id, username: user.username };
    }
}
exports.UserView = UserView;
exports.default = (db) => new UserResource(db);
//# sourceMappingURL=user.resource.js.map