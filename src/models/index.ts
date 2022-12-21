import { Request } from "express";
import { Session } from "express-session";

import { INewsHistory } from './news_analytics.model'
import { IUserCreateBody, ILoginBody } from './user.model'
import {
    INewsFindOptions, IPagination, INewsGetQuery,
    INewsCreateOptions, INewsCreateBody,
    UpdateBody, UpdateQuery
} from "./news.model"

export {
    INewsFindOptions, IPagination, INewsGetQuery,
    INewsCreateOptions, INewsCreateBody, UpdateBody,
    UpdateQuery, IUserCreateBody, ILoginBody, INewsHistory
}


export interface ISessionData {
    key: string,
    value: string
}

export interface IHttpResponse {
    error: boolean,
    message: string | object,
    data?: any
}

export type SessionWithUser = Session & { email?: string };

export type AuthRequest = Request & {
    session?: SessionWithUser
}
