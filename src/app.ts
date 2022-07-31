import 'dotenv/config'
import "reflect-metadata"
import Server from './Server'
import { AppdataSource } from './config/db.config'

import QueueWorker from './workers/QueueWorker'

(async () => {
    const queueWorker = new QueueWorker()
    await queueWorker.init()

    const server = new Server(queueWorker, AppdataSource);
    server.start()

})()

