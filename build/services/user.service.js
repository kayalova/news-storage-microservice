"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(user) {
        return this.userRepository.create(user);
    }
    getByEmail(email) {
        return this.userRepository.findOne({ email });
    }
    getById(id) {
        return this.userRepository.findOne({ id });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map