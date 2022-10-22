"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const Server_1 = __importDefault(require("./Server"));
const storage_1 = require("./storage");
const routes_1 = require("./routes");
const QueueWorker_1 = __importDefault(require("./workers/QueueWorker"));
const services_1 = require("./services");
const repositories_1 = require("./repositories");
const rabbitmq_transport_1 = __importDefault(require("./transport/rabbitmq.transport"));
(async () => {
    await rabbitmq_transport_1.default;
    const queueWorker = new QueueWorker_1.default();
    await queueWorker.init();
    const newsAnalyticsRepository = new repositories_1.NewsAnalyticsRepository(storage_1.clickhouseClient);
    const newsAnalyticsService = new services_1.NewsAnalyticsService(queueWorker, newsAnalyticsRepository);
    newsAnalyticsService.consume();
    const userRepository = new repositories_1.UserRepository(storage_1.postgresClient);
    const userService = new services_1.UserService(userRepository);
    const userRouter = new routes_1.UserRouter(userService);
    const newsRepository = new repositories_1.NewsRepository(storage_1.postgresClient);
    const newsService = new services_1.NewsService(queueWorker, newsRepository);
    const newsRouter = new routes_1.NewsRouter(newsService);
    const authService = new services_1.AuthService(userService);
    const authRouter = new routes_1.AuthRouter(authService);
    const server = new Server_1.default(newsRouter, userRouter, authRouter);
    await server.init();
    server.start();
})();
//# sourceMappingURL=app.js.map