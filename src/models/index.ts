import {
    INewsFindOptions, IPagination, IGetNewsQuery,
    INewsCreateOptions, INewsCreateBody,
    UpdateBody, UpdateQuery
} from "./news.model"

import { ICreateUserBody, ILoginBody } from './user.model'

export {
    INewsFindOptions, IPagination, IGetNewsQuery,
    INewsCreateOptions, INewsCreateBody, UpdateBody,
    UpdateQuery, ICreateUserBody, ILoginBody
}


export interface ISessionData {
    key: string,
    value: string
}