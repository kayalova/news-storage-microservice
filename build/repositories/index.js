"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.NewsAnalyticsRepository = exports.NewsRepository = void 0;
const news_repository_1 = __importDefault(require("./news.repository"));
exports.NewsRepository = news_repository_1.default;
const newsAnalytics_repository_1 = __importDefault(require("./newsAnalytics.repository"));
exports.NewsAnalyticsRepository = newsAnalytics_repository_1.default;
const user_repository_1 = __importDefault(require("./user.repository"));
exports.UserRepository = user_repository_1.default;
//# sourceMappingURL=index.js.map