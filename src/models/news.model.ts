interface IUpdateQuery {
    header?: string,
    description?: string
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export type UpdateBody = RequireAtLeastOne<IUpdateQuery, 'header' | 'description'>
export type UpdateQuery = UpdateBody & { id: number }

/* 
не проверять на уровне типов что передается хотя бы одно поле - может быть избыточно
а проверял бы в контроллеое 
*/

export interface IFindOptions {
    id?: number,
    header?: string,
    description?: string,
    author?: { firstName?: string, lastName?: string, email?: string },
}

export interface IPagination { // todo: подумать над неймингом
    skip?: number,
    take?: number
}

export interface IGetQuery {
    id?: number,
    header?: string,
    description?: string,
    authorFirstName?: string,
    authorLastName?: string,
    email?: string,
    skip?: number,
    take?: number,
};

export interface ICreateOptions {
    header: string,
    description: string,
    author: number
}

export interface ICreateBody {
    header: string,
    description: string,
    authorId: number
}


// export interface IGetOptions extends IFindOptions, IPagination { }