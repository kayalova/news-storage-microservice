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