import express from 'express'
const app = express()
// import routes from './src/api/news-broker'
import 'dotenv/config'
import Server from './api/Server'


const server = new Server();
server.start()
server.routes()



// вынести
process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});