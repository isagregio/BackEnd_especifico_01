import PiusRepository from "../repositories/PiusRepository";

class DeletePiuService {
    private piusRepository: PiusRepository; 

    constructor(piusRepository: PiusRepository){
        this.piusRepository = piusRepository;
    }

    public execute(piuId: string): void {
        const piu = this.piusRepository.findById(piuId);
        if (!piu) {
            throw new Error("Piu não encontrado.");
        }
        this.piusRepository.delete(piuId);
    }
}

export default DeletePiuService;
