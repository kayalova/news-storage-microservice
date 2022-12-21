import { DataSource, FindOptionsWhere } from 'typeorm'
import { RepositoryError, RoleEntity, UserEntity } from "../entities"
import { IUserCreateBody } from '../models';

class UserRepository {
    private userRepository;
    private roleRepository;

    constructor(appDataSource: DataSource) {
        this.userRepository = appDataSource.getRepository(UserEntity)
        this.roleRepository = appDataSource.getRepository(RoleEntity)
    }

    async create(user: IUserCreateBody): Promise<UserEntity> {
        try {
            const role = await this.roleRepository.findOneByOrFail({ name: user.role })

            const created = this.userRepository.create({ ...user, role })

            return await this.userRepository.save(created) // todo: compare to news create
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

    async findOne(options: FindOptionsWhere<UserEntity>, meta?: { [k: string]: boolean }): Promise<UserEntity | null> {
        try {
            return await this.userRepository.findOne({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    password: Boolean(meta?.showPassword)
                },
                where: options,
            })
        } catch (error: any) {
            throw new RepositoryError({
                location: 'UserRepository.findOne',
                message: error.message
            })
        }
    }
}

export default UserRepository
