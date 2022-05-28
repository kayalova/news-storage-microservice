import 'dotenv/config'
import Server from './api/Server'
import QueueWorker from './workers/QueueWorker'
import NewsControllers from './api/news-broker'


(async () => {
    const queueWorker = new QueueWorker()
    await queueWorker.init()


    const newsRouter = new NewsControllers(queueWorker).router

    const server = new Server(newsRouter, 'api/news');
    server.start()

})()

/* 
Server -> Controllers -> Service -> Queworker

Service use queueworker, it needs it
what ways to get it:
1



*/


// вынести
process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});

process.on('SIGTERM', () => {
    // server
    // server() => {
    //   console.log('Process terminated');
    // });
});