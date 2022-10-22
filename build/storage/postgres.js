"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: [entities_1.NewsEntity, entities_1.RoleEntity, entities_1.UserEntity],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=postgres.js.map