"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const application_1 = __importDefault(require("./app/application"));
const mock_database_1 = __importDefault(require("./mock.database"));
dotenv_1.default.config();
application_1.default(mock_database_1.default)
    .allowCors(['http://localhost:4200', 'http://localhost:8100'])
    .listen(process.env.HTTP_PORT, process.env.HTTP_HOST)
    .then((address) => {
    let addressName = `${address.address}:${address.port} (${address.family})`;
    console.log(`Server listening on ${addressName} ...`);
}).catch((error) => {
    console.error('Server Error: ', error.message || error);
});
//# sourceMappingURL=index.js.map