import { User } from '../../dominio/entities/user';
import { UserRepository } from '../../dominio/repository/UserRepository';

export class UserApplication {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: User): Promise<any> {
        return await this.userRepository.createUser(user);
    }

    async deleteUser(userId: number): Promise<void> {
        return await this.userRepository.deleteUser(userId);
    }
}