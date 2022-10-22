"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
class NewsRouter {
    constructor(newsService) {
        this.get = async (req, res) => {
            try {
                const { id, header, description, authorFirstName: firstName, authorLastName: lastName, email, skip, take } = req.query;
                console.log(req.session);
                const filter = {
                    id,
                    header,
                    description,
                    author: {
                        firstName,
                        lastName,
                        email
                    }
                };
                const news = await this.newsService.getAll(filter, { skip, take });
                res.send({
                    news
                });
            }
            catch (error) {
                res.send({
                    error: "Get error",
                    errorMessage: error
                });
            }
        };
        this.getOne = async (req, res) => {
            try {
                const { id } = req.params;
                console.log(req.session);
                const article = await this.newsService.getOne(Number(id));
                res.send({
                    article
                });
            }
            catch (error) {
                console.log(error);
                res.send({
                    error: "Get one error",
                    errorMessage: error
                });
            }
        };
        this.create = async (req, res) => {
            try {
                const { header, description, authorId } = req.body;
                console.log(req.session);
                const createdNews = await this.newsService.create({ author: authorId, header, description });
                res.status(201).send({
                    message: "Successfully created",
                    news: createdNews
                });
            }
            catch (error) {
                res.send({
                    error: "Create error",
                    errorMessage: error
                });
            }
        };
        this.update = async (req, res) => {
            try {
                console.log(req.session);
                const { header, description, id } = req.body;
                const result = await this.newsService.update(id, { header, description });
                res.send(result);
            }
            catch (error) {
                res.send({
                    error: "Update error",
                    errorMessage: error
                });
            }
        };
        this.delete = async (req, res) => {
            try {
                console.log(req.session);
                const { id } = req.params;
                await this.newsService.delete(Number(id));
                res.send({
                    success: true,
                    message: "Successfully deleted"
                });
            }
            catch (error) {
                res
                    .status(404)
                    .send({
                    error: "Delete error",
                    errorMessage: error
                }); // возвращать ли 404 когда отсутствует сущность
            }
        };
        this.newsService = newsService;
        this.router = (0, express_1.Router)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.router.use((0, middleware_1.logRequest)('News.router'));
    }
    routes() {
        this.router.post('/create', this.create);
        this.router.get('/:id', this.getOne); //news vs /news/
        this.router.get('/', this.get); // /news vs /news/
        this.router.put('/update', this.update);
        this.router.delete('/delete/:id', this.delete);
    }
}
exports.default = NewsRouter;
//# sourceMappingURL=news.router.js.map