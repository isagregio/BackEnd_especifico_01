import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";

interface UpdateUserDTO {
    id: string;
    nome: string; 
    nascimento: Date;
    cpf: string; 
    telefone: string; 
}

class UpdateUserService {
    private usersRepository: UsersRepository; 

    constructor(usersRepository: UsersRepository){
        this.usersRepository = usersRepository;
    }

    public execute({ id, nome, nascimento, cpf, telefone }: UpdateUserDTO): User {
        const existingUser = this.usersRepository.findById(id);
        if (!existingUser) {
            throw new Error("Usuário não encontrado.");
        }

        if (!nome || !nascimento || !cpf || !telefone) {
            throw new Error("Todas as informacoes devem ser completadas.");
        }

        const userWithSameCPF = this.usersRepository.findByCPF(cpf);
        if (userWithSameCPF && userWithSameCPF.id !== id) {
            throw new Error("Este CPF já está sendo usado por outro usuário.");
        }
    
        existingUser.nome = nome;
        existingUser.nascimento = nascimento;
        existingUser.cpf = cpf;
        existingUser.telefone = telefone;
        existingUser.update();

        this.usersRepository.update(existingUser);

        return existingUser;
    }
}

export default UpdateUserService;
