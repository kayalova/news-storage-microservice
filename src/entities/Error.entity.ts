export class ErrorApp extends Error {
    constructor(msg: string | object) {
        super(JSON.stringify(msg))
        // super(typeof msg == 'string' ? msg : JSON.stringify(msg))
    }
}

interface IErrorBody {
    name: string,
    message: string | object
}

export class RepositoryError extends ErrorApp {

    public name = 'RepositoryError';
    public repositoryName: string

    constructor(data: IErrorBody) {
        super(JSON.stringify(data))
        this.repositoryName = data.name
    }
}

export class ServiceError extends ErrorApp {

    public name = 'ServiceError';
    public serviceName: string

    constructor(data: IErrorBody) {
        super(JSON.stringify(data))
        this.serviceName = data.name
    }
}
