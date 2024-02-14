import User from '../models/User';
import { isEqual } from 'date-fns';


interface CreateUserDTO {
    nome: string; 
    nascimento: Date;
    cpf: string; 
    telefone: string; 
}

class UsersRepository {
    private users: User[];

    constructor() {
        this.users =[];
    }

    public all(): User[] {
        return this.users;
    }

    public findByCPF(cpf: string): User | null {
        const foundUser = this.users.find(user => user.cpf === cpf);
        return foundUser || null;
    }

    public findById(id: string): User | null {
        const foundUser = this.users.find(user => user.id === id);
        return foundUser || null;
    }

    public create({ nome, nascimento, cpf, telefone}: CreateUserDTO): User {
        const user = new User(nome, nascimento, cpf, telefone);
        this.users.push(user); 
        return user;
    }

    public update(updatedUser: User): User {
        this.users = this.users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
        return updatedUser;
    }

    public delete(userId: string): void {
        this.users = this.users.filter(user => user.id !== userId);
    }

}

export default UsersRepository; 