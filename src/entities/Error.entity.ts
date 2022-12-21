
interface IErrorBody {
    location: string,
    message: string,
    meta?: object
}

export class RepositoryError extends Error {
    public NAME = 'RepositoryError';
    public message: string;
    public location: string

    constructor(data: IErrorBody) {
        super(JSON.stringify(data))

        this.message = data.message
        this.location = data.location

        console.error(data.location, data.message, this.stack)
    }
}

export class ServiceError extends Error {
    public NAME = 'ServiceError';
    public message: string;
    public location: string

    constructor(data: IErrorBody,) {
        super(JSON.stringify(data))

        this.message = data.message
        this.location = data.location

        console.error(data.location, data.message)
    }
}
