"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.Module = exports.Authenticator = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authenticator_1 = require("./authenticator");
var authenticator_2 = require("./authenticator");
Object.defineProperty(exports, "Authenticator", { enumerable: true, get: function () { return authenticator_2.Authenticator; } });
var module_1 = require("./module");
Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return module_1.Module; } });
class Application {
    constructor(_database) {
        this._database = _database;
        this.authenticator = new authenticator_1.Authenticator();
        this.corsHosts = [];
        this.application = express_1.default()
            .use(body_parser_1.default.json())
            .use(body_parser_1.default.urlencoded({ extended: false }))
            .use(cookie_parser_1.default())
            .use(this.enableCors(this.corsHosts))
            .use(this.authenticator.authenticate.bind(this.authenticator))
            .use(this.init.bind(this));
    }
    get database() { return this._database; }
    allowCors(host) {
        if (typeof host == 'string')
            this.corsHosts.push(host);
        else
            this.corsHosts.push(...host);
        return this;
    }
    authenticate(scheme, auth) {
        this.authenticator.register(scheme, auth);
        return this;
    }
    route(path, handler) {
        this.application.use(path, handler);
        return this;
    }
    load(path) {
        Promise.resolve().then(() => __importStar(require(`${path}/module`))).then((mod) => {
            this.route(`/api`, mod.default(this).router);
        });
    }
    listen(port, host) {
        port = this.normalizePort(port);
        this.application.set('port', port);
        return new Promise((resolve, reject) => {
            this.server = this.application
                .listen(port, host)
                .on('listening', () => resolve(this.server.address()))
                .on('error', (error) => reject(error));
        });
    }
    close() {
        if (this.server) {
            return new Promise((resolve) => {
                this.server.close(() => {
                    this.server = null;
                    resolve();
                });
            });
        }
        else {
            return Promise.reject(new Error('Server is already closed.'));
        }
    }
    init(req, res, next) {
        next();
    }
    normalizePort(val) {
        let port = (typeof val === 'string') ? parseInt(val, 10) : val;
        return isNaN(port) ? val : port;
    }
    enableCors(hosts) {
        return (req, res, next) => {
            let origin = req.headers.origin;
            if (hosts.indexOf(origin) !== -1)
                res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
                .header('Access-Control-Allow-Credentials', 'true')
                .header('Access-Control-Expose-Headers', 'Set-Cookie');
            next();
        };
    }
}
exports.Application = Application;
//# sourceMappingURL=application.js.map