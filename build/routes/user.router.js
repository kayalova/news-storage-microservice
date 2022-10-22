"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
class UserRouter {
    constructor(userService) {
        this.create = async (req, res) => {
            try {
                const { firstName, lastName, email, password, role } = req.body;
                console.log(req.body);
                await this.userService.create({ firstName, lastName, email, password, role });
                res.status(201).send({
                    message: "Successfully created"
                });
            }
            catch (error) {
                res.send({
                    error: "Create user error",
                    message: error
                });
            }
        };
        this.userService = userService;
        this.router = (0, express_1.Router)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.router.use((0, middleware_1.logRequest)('User.router'));
    }
    routes() {
        this.router.post('/create', this.create);
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.router.js.map