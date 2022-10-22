"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class UserRepository {
    constructor(appDataSource) {
        this.userRepository = appDataSource.getRepository(entities_1.UserEntity);
        this.roleRepository = appDataSource.getRepository(entities_1.RoleEntity);
    }
    async create(user) {
        try {
            const role = await this.roleRepository.findOneByOrFail({ name: user.role });
            const created = this.userRepository.create(Object.assign(Object.assign({}, user), { role }));
            return await this.userRepository.save(created); // todo: compare to news create?
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: 'UserRepository.create',
                message: JSON.stringify(error) // what if remove json.stringify
            });
        }
    }
    async findOne(options) {
        try {
            return await this.userRepository.findOneBy(options);
        }
        catch (error) {
            throw new entities_1.RepositoryError({
                location: 'UserRepository.findOne',
                message: error
            });
        }
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map