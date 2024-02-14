import { v4 as uuidv4 } from 'uuid';

class Piu {
    id: string;
    texto: string; 
    idUsuario: string;
    criacao: Date; 
    atualizacao: Date; 

    constructor(texto: string, idUsuario: string) {
        this.id = uuidv4();
        this.texto = texto; 
        this.idUsuario = idUsuario; 
        this.criacao = new Date();
        this.atualizacao = this.criacao;
    }

    public update() {
        this.atualizacao = new Date();
    }
}



export default Piu;