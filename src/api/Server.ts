import express, { Router } from 'express'

export default class Server {
    private app: express.Application

    constructor(router: Router, api: string) {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.configuration()
        this.app._router = router
        this.app.use(api, router)

        console.log(this.app._router.stack)
    }

    public configuration() {
        this.app.set('port', process.env.APP_PORT || 3001)
    }

    public start() {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }

}
