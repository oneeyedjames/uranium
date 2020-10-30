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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_resource_1 = require("./user.resource");
exports.default = (db) => {
    return (token) => __awaiter(void 0, void 0, void 0, function* () {
        let payload = jsonwebtoken_1.default.decode(token);
        let model = new user_resource_1.UserModel(db);
        let user;
        if (user = yield model.find(payload['usr'])) {
            jsonwebtoken_1.default.verify(token, user.password, (err) => {
                if (err)
                    throw new Error('Invalid Password');
            });
            return user;
        }
        else {
            throw new Error('Invalid Username');
        }
    });
};
//# sourceMappingURL=jwt.authenticator.js.map