import amqp from 'amqplib'

import UserRepository from '../repository/user.repository';

export default class UserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async create() {
        await this.userRepository.create()
    }



}
