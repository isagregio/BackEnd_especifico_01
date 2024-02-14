import Piu from "../models/Piu";
import PiusRepository from "../repositories/PiusRepository";

interface UpdatePiuDTO {
    id: string;
    texto: string; 
}

class UpdatePiuService {
    private piusRepository: PiusRepository; 

    constructor(piusRepository: PiusRepository){
        this.piusRepository = piusRepository;
    }

    public execute({ id, texto }: UpdatePiuDTO): Piu {
        if (!texto.trim()) {
            throw new Error("O texto não pode ser vazio.");
        }
        if (texto.length > 140) {
            throw new Error("O texto não pode ter mais de 140 caracteres.");
        }
        const piu = this.piusRepository.findById(id);
        if (!piu) {
            throw new Error("Piu não encontrado.");
        }
        piu.texto = texto;
        piu.update(); 

        this.piusRepository.update(piu);

        return piu;
    }
}

export default UpdatePiuService;
