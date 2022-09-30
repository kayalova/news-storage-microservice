import { DataSource } from 'typeorm'
import { RoleEntity, UserEntity } from "../entities"
import { appDataSource } from '../config/db.config'


class UserRepository {
    private userRepository;
    private roleRepository;

    constructor(appDataSource: DataSource) {
        this.userRepository = appDataSource.getRepository(UserEntity)
        this.roleRepository = appDataSource.getRepository(RoleEntity)
        this.create()
    }

    async create() {

        try {
            // const authorRole = await this.roleRepository.findOneByOrFail({
            //     name: "author"
            // });

            const role = new RoleEntity()
            role.name = "author"
            role.actions = ["create", "read", "update", "delete"]
            await this.roleRepository.save(role)

            const user = new UserEntity()
            user.firstName = "Zarema"
            user.lastName = "Kayalova"
            user.email = "meowmeow@email.com"

            user.role = role // error

            //  this.userRepository.create({
            //     firstName: "Zarema",
            //     lastName: "Kayalova",
            //     email: "meowmeow@email.com",
            // })

            await this.userRepository.save(user)

        } catch (error) {

        }
    }
}

export default UserRepository