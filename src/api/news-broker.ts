import { Router, Request, Response } from 'express'
import QueueWorker from '../workers/QueueWorker';
import { NewsService } from './news-microservice'

export default class NewsControllers {
    public router: Router;
    public newsService: NewsService
    private queue: QueueWorker

    constructor(queue: QueueWorker) {
        this.router = Router()
        this.routes();
        this.newsService = new NewsService(queue)
        this.queue = queue
    }

    public get = async (req: Request, res: Response) => {
        // NewsApiMicroservice.getNews({request: req})
        /* 
        kafkaConsumer.listen('returnNews', (data) => {       
            const response = {request: data.req, response: data.response.news}
            res.send(response)
        })
        */
        const a = this.newsService.getNews() // !!!!!!!!!!
        console.log("a is ", a)
        // res
        //     .status(200)
        //     .send({
        //         request: { path: req.path },
        //         response: { news: 'news' }
        //     })
    }

    public update = async (req: Request, res: Response) => {
        console.log(`the id is ${req.params.id}`)
        res
            .status(204)
            .json({
                request: { path: req.path, body: req.body },
                response: "Successfully updated"
            })
    }

    public routes() {
        this.router.get('/', this.get)
        this.router.put('/:id', this.get)
    }
}
/* 
express router

GET /news
PUT /news/


router.get('/coolestapi/news, req, res => {
    NewsApiMicroservice.getNews({request: req})
    
    kafkaConsumer.listen('returnNews', (data) => {       
        const response = {request: data.req, response: data.response.news}
        res.send(response)
    })

})
*/