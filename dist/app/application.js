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
const application_1 = require("../lib/application");
const basic_authenticator_1 = __importDefault(require("./basic.authenticator"));
const jwt_authenticator_1 = __importDefault(require("./jwt.authenticator"));
const host_resource_1 = __importDefault(require("./host.resource"));
const user_resource_1 = __importDefault(require("./user.resource"));
const role_resource_1 = __importDefault(require("./role.resource"));
exports.default = (db) => {
    let app = new application_1.Application(db)
        .authenticate('Basic', basic_authenticator_1.default(db))
        .authenticate('JWT', jwt_authenticator_1.default(db))
        .route('/api', host_resource_1.default(db).router)
        .route('/api', user_resource_1.default(db).router)
        .route('/api', role_resource_1.default(db).router);
    ['blog'].forEach((modName) => {
        Promise.resolve().then(() => __importStar(require(`../mod/${modName}/module`))).then((mod) => {
            app.route(`/api`, mod.default(db).router);
        });
    });
    return app;
};
//# sourceMappingURL=application.js.map