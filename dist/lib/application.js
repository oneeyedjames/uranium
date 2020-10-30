"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authenticator_1 = require("./authenticator");
class Application {
    constructor(database) {
        this.database = database;
        this.authenticator = new authenticator_1.Authenticator();
        this.corsHosts = [];
        this.application = express_1.default()
            .use(body_parser_1.default.json())
            .use(body_parser_1.default.urlencoded({ extended: false }))
            // .use(cookieParser())
            .use(this.enableCors(this.corsHosts))
            .use(this.authenticator.authenticate.bind(this.authenticator));
    }
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