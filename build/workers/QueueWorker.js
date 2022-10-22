"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmq_transport_1 = __importDefault(require("../transport/rabbitmq.transport"));
class QueueWorker {
    constructor(channelOptions) {
        this.msgOptions = channelOptions || {};
    }
    async init() {
        try {
            this.connection = await rabbitmq_transport_1.default;
            this.channel = await this.connection.createChannel();
            console.log('Successfully connected to rabbitmq');
            this.channel.nackAll(); //TODO: уточнить
        }
        catch (error) {
            console.error(`Rabbitmq error: ${error}`);
            process.exit(1); // todo: move
        }
    }
    async getChannel() {
        if (!this.connection || !this.channel) {
            await this.init();
        }
        return this.channel;
    }
    async sendMessage(queue, msg) {
        if (!this.channel) {
            await this.getChannel();
        }
        // await this.channel!.assertQueue(queue) //TODO: оставить
        this.channel.sendToQueue(queue, Buffer.from(msg), this.msgOptions);
        console.log(`Message was sended to queue ${queue}`);
    }
    async consumeMessage(queue, handler) {
        if (!this.channel) {
            await this.getChannel();
        }
        await this.channel.assertQueue(queue);
        console.log(`Listening to ${queue}`);
        this.channel.consume(queue, async (data) => {
            const msg = JSON.parse(data === null || data === void 0 ? void 0 : data.content.toString());
            console.log(`${queue} receive message: ${JSON.stringify(msg)}`);
            await handler(msg, data);
        }, {
            noAck: true
        });
    }
}
exports.default = QueueWorker;
//# sourceMappingURL=QueueWorker.js.map