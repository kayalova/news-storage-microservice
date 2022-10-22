"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
class AuthRouter {
    constructor(authService) {
        this.login = async (req, res) => {
            // add try catch
            const { email, password } = req.body;
            const loginData = await this.authService.login({ email, password });
            const sess = req.session;
            //@ts-ignore
            sess.user = loginData.key;
            //@ts-ignore
            sess.password = loginData.value; // todo: hash
            console.log(sess);
            res.end("success");
        };
        this.authService = authService;
        this.router = (0, express_1.Router)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.router.use((0, middleware_1.logRequest)('Auth.router'));
    }
    routes() {
        this.router.post('/login', this.login);
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.router.js.map