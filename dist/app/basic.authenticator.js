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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthenticator = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_resource_1 = require("./user.resource");
class BasicAuthenticator {
    constructor(app) {
        this.app = app;
        this.authenticate = (token) => __awaiter(this, void 0, void 0, function* () {
            let raw = Buffer.from(token, 'base64').toString('utf8');
            let username = '', password = '';
            [username, password] = raw.split(':', 2);
            return yield this.login(username, password);
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = new user_resource_1.UserResource(this.app);
            let model = new user_resource_1.UserModel(res);
            let user;
            if (user = yield model.findByUsername(username)) {
                if (yield bcrypt_1.default.compare(password, user.password))
                    return user;
                else
                    throw new Error('Invalid Password');
            }
            else {
                throw new Error('Invalid Username');
            }
        });
    }
}
exports.BasicAuthenticator = BasicAuthenticator;
exports.default = (app) => new BasicAuthenticator(app);
//# sourceMappingURL=basic.authenticator.js.map