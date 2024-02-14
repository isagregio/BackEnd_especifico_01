import { v4 as uuidv4 } from 'uuid';

class User {
    id: string;
    nome: string; 
    nascimento: Date;
    cpf: string; 
    telefone: string; 
    criacao: Date; 
    atualizacao: Date; 

    constructor(nome: string, nascimento: Date, cpf: string, telefone: string) {
        this.id = uuidv4();
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf; 
        this.telefone = telefone; 
        this.criacao = new Date();
        this.atualizacao = this.criacao;
    }

    public update() {
        this.atualizacao = new Date();
    }
}

export default User;
