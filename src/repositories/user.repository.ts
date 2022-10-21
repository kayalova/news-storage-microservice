import { DataSource, FindOptionsWhere } from 'typeorm'
import { RepositoryError, RoleEntity, UserEntity } from "../entities"
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

    async findOne(options: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
        try {
            return await this.userRepository.findOneBy(options)
        } catch (error) {
            console.error(error)
            throw new RepositoryError({
                name: 'User',
                message: JSON.stringify(error) // what if remove json.stringify
            })
        }
    }
}

export default UserRepository
