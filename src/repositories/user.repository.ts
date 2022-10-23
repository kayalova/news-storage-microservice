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

            return await this.userRepository.save(created) // todo: compare to news create?
        } catch (error: any) {

            if (error?.driverError?.code === '23505') { //unique_violation 
                throw new RepositoryError({
                    location: 'UserRepository.create',
                    message: "User with such email already exists"
                })
            }

            throw new RepositoryError({
                location: 'UserRepository.create',
                message: error.message
            })
        }
    }

    async findOne(options: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
        try {
            return await this.userRepository.findOneBy(options)
        } catch (error: any) {
            throw new RepositoryError({
                location: 'UserRepository.findOne',
                message: error.message
            })
        }
    }
}

export default UserRepository
