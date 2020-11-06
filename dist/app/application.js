"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApplication = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const express_1 = require("express");
const application_1 = require("../lib/application");
const basic_authenticator_1 = __importDefault(require("./basic.authenticator"));
const jwt_authenticator_1 = __importDefault(require("./jwt.authenticator"));
const host_resource_1 = __importDefault(require("./host.resource"));
const user_resource_1 = __importDefault(require("./user.resource"));
const role_resource_1 = __importDefault(require("./role.resource"));
const host_resource_2 = require("./host.resource");
class RestApplication extends application_1.Application {
    constructor(db) {
        super(db);
        let basicAuth = basic_authenticator_1.default(this);
        let jwtAuth = jwt_authenticator_1.default(this);
        this.authenticate('JWT', jwtAuth.authenticate)
            .authenticate('Basic', basicAuth.authenticate)
            .route('/api', host_resource_1.default(this).router)
            .route('/api', user_resource_1.default(this).router)
            .route('/api', role_resource_1.default(this).router);
        this.route('/api', express_1.Router()
            .post('/login', (req, res) => {
            basicAuth.login(req.body.username, req.body.password)
                .then((user) => jwtAuth.generate(user))
                .then((token) => res.json({ token: token }))
                .catch((err) => res.status(401).json({
                error: {
                    name: err.name || 'Error',
                    message: err.message || err
                }
            }));
        }));
        this.authenticator.acceptCookies('auth');
        let path = path_1.join(__dirname, '../mod');
        fs_1.readdir(path, { withFileTypes: true }, (err, files) => {
            if (err)
                return console.log(err);
            for (let file of files) {
                if (file.isDirectory()) {
                    this.load(path_1.join(path, file.name));
                }
            }
        });
    }
    init(req, res, next) {
        let model = new host_resource_2.HostModel(host_resource_1.default(this));
        model.search({ domain: req.hostname })
            .then((hosts) => {
            return hosts.length ? hosts : model.search({ default: true });
        })
            .then((hosts) => {
            if (hosts.length)
                req.instance = hosts[0];
        })
            .catch(console.log)
            .finally(next);
    }
}
exports.RestApplication = RestApplication;
exports.default = (db) => new RestApplication(db);
//# sourceMappingURL=application.js.map