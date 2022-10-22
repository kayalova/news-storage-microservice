"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
function logRequest(routerName) {
    return (req, _, next) => {
        console.log(`${routerName}.${req.method} request`);
        next();
    };
}
exports.logRequest = logRequest;
//# sourceMappingURL=index.js.map