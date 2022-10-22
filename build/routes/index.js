"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.NewsRouter = exports.UserRouter = void 0;
const user_router_1 = __importDefault(require("./user.router"));
exports.UserRouter = user_router_1.default;
const news_router_1 = __importDefault(require("./news.router"));
exports.NewsRouter = news_router_1.default;
const auth_router_1 = __importDefault(require("./auth.router"));
exports.AuthRouter = auth_router_1.default;
//# sourceMappingURL=index.js.map