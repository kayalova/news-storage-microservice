import { UserEntity } from '../entities';
import { ICreateUserBody } from '../models';

import UserRepository from '../repositories/user.repository';

export default class UserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    create(user: ICreateUserBody): Promise<UserEntity> {
        return this.userRepository.create(user)
    }

    getByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ email })
    }

    getById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({ id })
    }

}
