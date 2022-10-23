import {
    INewsFindOptions, IPagination, IGetNewsQuery,
    INewsCreateOptions, INewsCreateBody,
    UpdateBody, UpdateQuery
} from "./news.model"

import { ICreateUserBody, ILoginBody } from './user.model'
import { INewsHistory } from './news_analytics.model'

export {
    INewsFindOptions, IPagination, IGetNewsQuery,
    INewsCreateOptions, INewsCreateBody, UpdateBody,
    UpdateQuery, ICreateUserBody, ILoginBody, INewsHistory
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


import { Request } from "express";
import { Session } from "express-session";

export type SessionWithUser = Session & { email?: string };

export type AuthRequest = Request & {
    session?: SessionWithUser
}