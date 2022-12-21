export interface IUserCreateBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

export interface ILoginBody {
    email: string,
    password: string
}