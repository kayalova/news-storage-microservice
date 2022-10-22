"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeToClickhouse = void 0;
const utils_1 = require("../utils");
// from typeorm entity to clickhouse
function deserializeToClickhouse(news) {
    console.log(news.createdAt);
    return {
        news_id: news.id,
        header: news.header,
        description: news.description,
        created_at: (0, utils_1.formatDateToClickhouse)(new Date(news.createdAt).toISOString()),
        updated_at: news.updatedAt && (0, utils_1.formatDateToClickhouse)(new Date(news.updatedAt).toISOString()),
        author: JSON.stringify({
            id: news.author.id,
            firstName: news.author.firstName,
            lastName: news.author.lastName,
            email: news.author.email,
        })
    };
}
exports.deserializeToClickhouse = deserializeToClickhouse;
//# sourceMappingURL=news.serializator.js.map