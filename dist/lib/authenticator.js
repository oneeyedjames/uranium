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
exports.Authenticator = void 0;
class Authenticator {
    constructor() {
        this.handlers = {};
    }
    acceptCookies(name) {
        this.cookie = name;
    }
    register(scheme, authenticate) {
        this.handlers[scheme.toLowerCase()] = authenticate;
    }
    authenticate(req, res, next) {
        let token = req.cookies[this.cookie] || req.header('Authorization');
        if (token) {
            this.handle(token)
                .then((user) => req.user = user)
                .catch((err) => console.error(err.message || err))
                .finally(next);
        }
        else {
            next();
        }
    }
    handle(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let scheme;
            [scheme, token] = token.split(' ', 2);
            let auth;
            if (auth = this.handlers[scheme.toLowerCase()]) {
                return yield auth(token);
            }
            else {
                throw new Error(`No handler for scheme: ${scheme}`);
            }
        });
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map