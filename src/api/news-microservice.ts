import amqp from 'amqplib'
import QueueWorker from '../workers/QueueWorker';

export class NewsService {

    constructor(queue: QueueWorker) {

    }


    getNews() {
        console.log(2)
        return 'i got ur neews beeetch'
        // this.connectToRabbitmq().then(channel => { })
        // this.channel.sendToQueue(QUEUE, Buffer.from(message));
    }
}
