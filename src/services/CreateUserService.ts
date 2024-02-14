import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
    nome: string; 
    nascimento: Date;
    cpf: string; 
    telefone: string; 
}

class CreateUserService {
    private usersRepository: UsersRepository; 
    constructor(usersRepository: UsersRepository){
        this.usersRepository = usersRepository;
    }

    public execute({ nome, nascimento, cpf, telefone }: Request): User {
        if (!nome || !nascimento || !cpf || !telefone) {
            throw new Error("Todas as informacoes devem ser completadas.");
        }

        const userWithSameCPF = this.usersRepository.findByCPF(cpf);
        if (userWithSameCPF) {
            throw new Error("Este CPF já está sendo usado por outro usuário.");
        }
    
        const user = this.usersRepository.create({
            nome, nascimento, cpf, telefone
        });

        return user;
    }
}

export default CreateUserService;
