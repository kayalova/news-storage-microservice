import { ILoginBody, ISessionData } from "../models";
import UserService from '../services/user.service'

class AuthService {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    public async login(loginData: ILoginBody): Promise<ISessionData> {
        const { email, password } = loginData
        const user = await this.userService.getByEmail(email)

        if (!user) {
            throw new Error(JSON.stringify({ error: "asd" })) // todo: finish
        }

        if (user.password !== password) {
            throw new Error(JSON.stringify({ error: 'password is not correct!!!' })) // todo: finish
        }

        return {
            key: email,
            value: `${Date.now()}-${email}`
        }

    }
}

export default AuthService