"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const connection = amqplib_1.default.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT)
});
exports.default = connection;
//# sourceMappingURL=rabbitmq.transport.js.map