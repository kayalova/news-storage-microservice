interface IUpdateNewsQuery {
    header?: string,
    description?: string
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export type UpdateBody = RequireAtLeastOne<IUpdateNewsQuery, 'header' | 'description'>
export type UpdateQuery = UpdateBody & { id: number }

/* 
не проверять на уровне типов что передается хотя бы одно поле - может быть избыточно
можно проверять в контроллере 
*/

export interface INewsFindOptions {
    id?: number,
    header?: string,
    description?: string,
    author?: { firstName?: string, lastName?: string, email?: string },
}

export interface IPagination {
    skip?: number,
    take?: number
}

export interface INewsGetQuery {
    id?: number,
    header?: string,
    description?: string,
    authorFirstName?: string,
    authorLastName?: string,
    email?: string,
    skip?: number,
    take?: number,
};

export interface INewsCreateOptions {
    header: string,
    description: string,
    author: number
}

export interface INewsCreateBody {
    header: string,
    description: string,
    authorId: number
}
