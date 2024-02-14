import UsersRepository from "../repositories/UsersRepository";

class DeleteUserService {
    private usersRepository: UsersRepository; 

    constructor(usersRepository: UsersRepository){
        this.usersRepository = usersRepository;
    }

    public execute(userId: string): void {
        const existingUser = this.usersRepository.findById(userId);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        this.usersRepository.delete(userId);
    }
}

export default DeleteUserService;
