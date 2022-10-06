import { DataSource } from 'typeorm'
import { RoleEntity, UserEntity } from "../entities"
import { ICreateUserBody } from '../models';

class UserRepository {
    private userRepository;
    private roleRepository;

    constructor(appDataSource: DataSource) {
        this.userRepository = appDataSource.getRepository(UserEntity)
        this.roleRepository = appDataSource.getRepository(RoleEntity)
    }

    async create(user: ICreateUserBody): Promise<UserEntity> {
        try {
            const role = await this.roleRepository.findOneByOrFail({ name: user.role })

            const created = this.userRepository.create({ ...user, role })

            return await this.userRepository.save(created)
        } catch (error) {
            console.error("UserRepository.create", error)
            throw new Error(JSON.stringify(error))
        }
    }
}

export default UserRepository
