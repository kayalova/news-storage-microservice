
interface IErrorBody {
    location: string,
    message: string, // ?
    meta?: object
}

export class RepositoryError extends Error {
    public name = 'RepositoryError';
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
    public name = 'ServiceError';
    public message: string;
    public location: string

    constructor(data: IErrorBody,) {
        super(JSON.stringify(data))

        this.message = data.message
        this.location = data.location

        console.error(data.location, data.message)
    }
}

// ERROR_CONST 