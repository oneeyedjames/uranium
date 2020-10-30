"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
class Authenticator {
    constructor() {
        this.handlers = {};
    }
    register(scheme, authenticate) {
        this.handlers[scheme.toLowerCase()] = authenticate;
    }
    authenticate(req, res, next) {
        let header = req.header('Authorization');
        if (header) {
            let scheme, token;
            [scheme, token] = header.split(' ', 2);
            let auth;
            if (auth = this.handlers[scheme.toLowerCase()]) {
                auth(token)
                    .then((user) => req.user = user)
                    .catch((err) => console.error(err.message || err))
                    .finally(next);
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=authenticator.js.map