"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = exports.RepositoryError = void 0;
class ErrorApp extends Error {
    constructor(msg) {
        super(JSON.stringify(msg));
        // super(typeof msg == 'string' ? msg : JSON.stringify(msg))
    }
}
class RepositoryError extends ErrorApp {
    constructor(data) {
        super(JSON.stringify(data));
        this.name = 'RepositoryError';
        console.log(data.location, data.message);
    }
}
exports.RepositoryError = RepositoryError;
class ServiceError extends ErrorApp {
    constructor(data) {
        super(JSON.stringify(data));
        this.name = 'ServiceError';
        console.log(data.location, data.message);
    }
}
exports.ServiceError = ServiceError;
//# sourceMappingURL=Error.entity.js.map