"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@clickhouse/client");
exports.default = (0, client_1.createClient)({
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
    database: process.env.CLICKHOUSE_DB,
    host: process.env.CLICKHOUSE_URL,
    log: {
        enable: true
    }
});
//# sourceMappingURL=clickhouse.js.map