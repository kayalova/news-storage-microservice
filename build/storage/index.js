"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickhouseClient = exports.postgresClient = exports.redisClient = void 0;
const redis_1 = __importDefault(require("./redis"));
exports.redisClient = redis_1.default;
const postgres_1 = __importDefault(require("./postgres"));
exports.postgresClient = postgres_1.default;
const clickhouse_1 = __importDefault(require("./clickhouse"));
exports.clickhouseClient = clickhouse_1.default;
//# sourceMappingURL=index.js.map