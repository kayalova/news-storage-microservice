class ErrorApp extends Error {
    constructor(msg: string | object) {
        super(JSON.stringify(msg))
        // super(typeof msg == 'string' ? msg : JSON.stringify(msg))
    }
}

interface IErrorBody {
    location: string,
    message: unknown // ?
}

export class RepositoryError extends ErrorApp {
    public name = 'RepositoryError';

    constructor(data: IErrorBody) {
        super(JSON.stringify(data))
        console.log(data.location, data.message)
    }
}

export class ServiceError extends ErrorApp {
    public name = 'ServiceError';

    constructor(data: IErrorBody) {
        super(JSON.stringify(data))
        console.log(data.location, data.message)
    }
}
