"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApplication = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const application_1 = require("../lib/application");
const basic_authenticator_1 = __importDefault(require("./basic.authenticator"));
const jwt_authenticator_1 = __importDefault(require("./jwt.authenticator"));
const host_resource_1 = __importDefault(require("./host.resource"));
const user_resource_1 = __importDefault(require("./user.resource"));
const role_resource_1 = __importDefault(require("./role.resource"));
class RestApplication extends application_1.Application {
    constructor(db) {
        super(db);
        this.authenticate('JWT', jwt_authenticator_1.default(this))
            .authenticate('Basic', basic_authenticator_1.default(this))
            .route('/api', host_resource_1.default(this).router)
            .route('/api', user_resource_1.default(this).router)
            .route('/api', role_resource_1.default(this).router);
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
}
exports.RestApplication = RestApplication;
exports.default = (db) => new RestApplication(db);
//# sourceMappingURL=application.js.map