import 'dotenv/config'
import Server from './api/Server'
import QueueWorker from './workers/QueueWorker'
import NewsService from './services/news.service'

(async () => {
    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const server = new Server(queueWorker);
    server.start()

})()