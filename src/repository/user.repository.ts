import { DataSource } from 'typeorm'
import { RoleEntity, UserEntity } from "../entities"

class UserRepository {
    private userRepository;
    private roleRepository;

    constructor(appDataSource: DataSource) {
        this.userRepository = appDataSource.getRepository(UserEntity)
        this.roleRepository = appDataSource.getRepository(RoleEntity)
    }

    async create(user: any) {

        try {

            const role = await this.roleRepository.findOneByOrFail({ name: user.role })

            const a = {
                firstName: "Zarema",
                lastName: "Kayalova",
                email: "meowmeow@email.com",
                role,
            }

            const user1 = this.userRepository.create(a)

            await this.userRepository.save(user1)

        } catch (error) {
            console.error("UserRepository.create", error)
        }
    }
}

export default UserRepository
