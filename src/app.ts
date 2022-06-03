import 'dotenv/config'
import Server from './api/Server'
import QueueWorker from './workers/QueueWorker'
import NewsService from './api/news-microservice'


(async () => {
    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const newsService = new NewsService(queueWorker)
    await newsService.init()

    const server = new Server(queueWorker);
    server.start()

})()