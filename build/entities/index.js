"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryError = exports.ServiceError = exports.UserEntity = exports.RoleEntity = exports.NewsEntity = void 0;
const News_entity_1 = require("./db/News.entity");
Object.defineProperty(exports, "NewsEntity", { enumerable: true, get: function () { return News_entity_1.NewsEntity; } });
const Role_entity_1 = require("./db/Role.entity");
Object.defineProperty(exports, "RoleEntity", { enumerable: true, get: function () { return Role_entity_1.RoleEntity; } });
const User_entity_1 = require("./db/User.entity");
Object.defineProperty(exports, "UserEntity", { enumerable: true, get: function () { return User_entity_1.UserEntity; } });
const Error_entity_1 = require("./Error.entity");
Object.defineProperty(exports, "ServiceError", { enumerable: true, get: function () { return Error_entity_1.ServiceError; } });
Object.defineProperty(exports, "RepositoryError", { enumerable: true, get: function () { return Error_entity_1.RepositoryError; } });
//# sourceMappingURL=index.js.map