import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';

const usersRouter = Router();

const usersRepository = new UsersRepository;

// ROTA DE LISTAGEM 
usersRouter.get('/', (request, response) => {
    const users = usersRepository.all();
    return response.json(users);
});
usersRouter.get('/:id', (request, response) => {
    const users = usersRepository.all();
    const { id } = request.params;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return response.status(404).json({ error: "Usuário não encontrado." });
    }
    return response.json(users[userIndex]);
});

// ROTA DE CRIACAO 
usersRouter.post('/', (request, response) => {
    try {
    const { nome, nascimento, cpf, telefone} = request.body; 
    const parsedNascimento  = parseISO(nascimento);
    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({
        nome, 
        nascimento: parsedNascimento,
        cpf, 
        telefone
    });

    return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
});

// ROTA DE ATUALIZAÇÃO
usersRouter.put('/:id', (request, response) => {
    try {
        const { id } = request.params;
        const { nome, nascimento, cpf, telefone } = request.body;
        const parsedNascimento = parseISO(nascimento);
        const updateUser = new UpdateUserService(usersRepository);
        const user = updateUser.execute({
            id,
            nome,
            nascimento: parsedNascimento,
            cpf,
            telefone
        });
        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
});

// ROTA DE EXCLUSÃO
usersRouter.delete('/:id', (request, response) => {
    try {
        const { id } = request.params;
        const deleteUser = new DeleteUserService(usersRepository);
        deleteUser.execute(id);
        return response.status(204).send(); 
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message });
    }
});


export default usersRouter;