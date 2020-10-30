"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatusMessage = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, message) {
        super(message || httpStatusMessage(status));
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
function httpStatusMessage(status) {
    switch (status) {
        case 401:
            return 'Unauthorized';
        case 404:
            return 'Not Found';
        case 500:
        default:
            return 'Internal Server Error';
    }
}
exports.httpStatusMessage = httpStatusMessage;
//# sourceMappingURL=http.js.map