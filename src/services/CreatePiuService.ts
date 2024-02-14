import Piu from "../models/Piu";
import PiusRepository from "../repositories/PiusRepository";

interface CreatePiuDTO {
    texto: string; 
    idUsuario: string;
}

class CreatePiuService {
    private piusRepository: PiusRepository; 
    constructor(piusRepository: PiusRepository){
        this.piusRepository = piusRepository;
    }

    public execute({ texto, idUsuario }: CreatePiuDTO): Piu {
        if (!texto.trim()) {
            throw new Error("O texto não pode ser vazio.");
        }

        if (texto.length > 140) {
            throw new Error("O texto não pode ter mais de 140 caracteres.");
        }

        const userExists = this.piusRepository.userExists(idUsuario);
        if (!userExists) {
            throw new Error("O usuário informado não existe.");
        }

        const piu = this.piusRepository.create({ texto, idUsuario });

        return piu;
    }
}

export default CreatePiuService;
