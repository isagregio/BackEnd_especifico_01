import Piu from '../models/Piu';

interface CreatePiuDTO {
    texto: string; 
    idUsuario: string;
}

class PiusRepository {
    private pius: Piu[];

    constructor() {
        this.pius =[];
    }

    public userExists(userId: string): boolean {
        return !!userId;
    }

    public findById(id: string): Piu | null {
        const foundPiu = this.pius.find(piu => piu.id === id);
        return foundPiu || null;
    }

    public all(): Piu[] {
        return this.pius;
    }


    public create({ texto, idUsuario }: CreatePiuDTO): Piu {
        const piu = new Piu(texto, idUsuario);
        this.pius.push(piu); 
        return piu;
    }

    public update(updatedPiu: Piu): Piu {
        this.pius = this.pius.map(piu =>
            piu.id === updatedPiu.id ? updatedPiu : piu
        );
        return updatedPiu;
    }

    public delete(piuId: string): void {
        this.pius = this.pius.filter(piu => piu.id !== piuId);
    }

}

export default PiusRepository; 