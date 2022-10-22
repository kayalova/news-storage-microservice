"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const storage_1 = require("./storage");
class Server {
    constructor(newsRouter, userRouter, authRouter) {
        this.newsRouter = newsRouter;
        this.userRouter = userRouter;
        this.authRouter = authRouter;
        this.redisClient = storage_1.redisClient;
    }
    async init() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true })); // todo
        await this.runStorageClients();
        this.configuration();
        this.routes();
    }
    async runStorageClients() {
        try {
            await this.redisClient.connect();
            console.log('Successfully created to redis');
            await storage_1.postgresClient.initialize();
            console.log('Successfully connected to postgresql');
        }
        catch (error) {
            console.error('Server.runStorageClients error', error);
            process.exit(1);
        }
    }
    routes() {
        this.app.use('/api/news', this.newsRouter.router);
        this.app.use('/api/users', this.userRouter.router);
        this.app.use('/api/auth', this.authRouter.router);
    }
    configuration() {
        this.app.set('port', process.env.APP_PORT || 3001);
        const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
        this.app.use((0, express_session_1.default)({
            store: new RedisStore({ client: this.redisClient }),
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
        }));
    }
    start() {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map