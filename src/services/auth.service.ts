import { ServiceError } from "../entities";
import { ILoginBody, ISessionData } from "../models";
import { UserService } from '../services'
import * as utils from '../utils'

class AuthService {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    public async login(loginData: ILoginBody): Promise<ISessionData> {
        const { email, password } = loginData
        const user = await this.userService.getByEmail(email)

        if (!user) {
            throw new ServiceError({
                name: 'Auth',
                message: "User with such email doesn't exists"
            })
        }

        const areEqualPasswords = await utils.compareHashed(password, user.password)

        if (!areEqualPasswords) {
            throw new ServiceError({
                name: 'Auth',
                message: "Invalid password"
            })
        }

        return {
            key: email,
            value: `${Date.now()}-${email}`
        }

    }
}

export default AuthService