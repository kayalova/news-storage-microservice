import { UserEntity } from '../entities';
import { IUserCreateBody } from '../models';
import { UserRepository } from '../repositories';


class UserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    create(user: IUserCreateBody): Promise<UserEntity> {
        return this.userRepository.create(user)
    }

    getByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ email }, { showPassword: true })
    }

    getById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({ id })
    }

}

export default UserService