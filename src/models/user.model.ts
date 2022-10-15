export interface ICreateUserBody {
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