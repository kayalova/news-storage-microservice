import { Router, Request, Response } from 'express'
import QueueWorker from '../workers/QueueWorker';

export default class NewsControllers {
    public router: Router;
    private queueWorker: QueueWorker

    constructor(queueWorker: QueueWorker) {
        this.router = Router()
        this.routes();
        this.queueWorker = queueWorker
    }

    public route = async (req: Request, res: Response) => {
        console.log(`NewsController.${req.method} request`)

        try {
            const request = {
                path: req.path,
                params: req.params,
                method: req.method
            }

            this.queueWorker.sendMessage(process.env.NEWS_REQUEST_QUEUE as string, JSON.stringify({ request }))

        } catch (error) {
            console.error(`NewsController.${req.method} error: ${error}`)
        }


        this.queueWorker.consumeMessage(process.env.NEWS_RESPONSE_QUEUE as string, async (data: any) => {
            console.log(0)
            const msg = JSON.parse(data?.content.toString())
            res.send(msg)
            // res.end()
        })


    }

    public routes() {
        this.router.get('/', this.route)
        this.router.put('/:id', this.route)
    }
}