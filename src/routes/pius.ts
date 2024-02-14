import { Router } from 'express';
import PiusRepository from '../repositories/PiusRepository';
import CreatePiuService from '../services/CreatePiuService';
import UpdatePiuService from '../services/UpdatePiuService';
import DeletePiuService from '../services/DeletePiuService';

const piusRouter = Router();
const piusRepository = new PiusRepository();

// ROTA DE LISTAGEM 
piusRouter.get('/', (request, response) => {
    const pius = piusRepository.all();
    return response.json(pius);
});
piusRouter.get('/:id', (request, response) => {
    const pius = piusRepository.all();
    const { id } = request.params;
    const piuIndex = pius.findIndex(piu => piu.id === id);
    if (piuIndex === -1) {
        return response.status(404).json({ error: "Piu não encontrado." });
    }
    return response.json(pius[piuIndex]);
});

// ROTA DE CRIAÇÃO
piusRouter.post('/', (request, response) => {
    try {
        const { texto, idUsuario } = request.body;
        const createPiuService = new CreatePiuService(piusRepository);
        const piu = createPiuService.execute({ texto, idUsuario });
        return response.json(piu);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
});

// ROTA DE ATUALIZAÇÃO
piusRouter.put('/:id', (request, response) => {
    try {
        const { id } = request.params;
        const { texto } = request.body;
        const updatePiuService = new UpdatePiuService(piusRepository);
        const piu = updatePiuService.execute({ id, texto });
        return response.json(piu);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
});

// ROTA DE DELETAR
piusRouter.delete('/:id', (request, response) => {
    try {
        const { id } = request.params;
        const deletePiuService = new DeletePiuService(piusRepository);
        deletePiuService.execute(id);
        return response.status(204).send(); 
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
});

export default piusRouter;
