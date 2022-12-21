import { IHttpResponse } from "../models";

class HttpResponseEntity {
    public data;

    constructor(data: IHttpResponse) {
        this.data = data
    }

    getBody() {
        return this.data
    }
}

export default HttpResponseEntity
