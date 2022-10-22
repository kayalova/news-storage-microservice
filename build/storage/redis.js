"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
exports.default = (0, redis_1.createClient)({
    // url: 'redis://127.0.0.1:6379', ??? excuse me
    url: process.env.REDIS_URL,
    legacyMode: true // what was that
});
//# sourceMappingURL=redis.js.map