import { IUsuario } from "../../models/Usuario/Usuario";
import { UsuarioRepository } from "../../repositories/usuario/UsuarioRepository";


export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository?: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository || new UsuarioRepository();
    }

    public async criarUsuario(nome: string, sobrenome: string): Promise<IUsuario> {
        if (!nome || !sobrenome) {
            throw new Error('Nome e sobrenome são obrigatórios');
        }
        return await this.usuarioRepository.criar(nome, sobrenome);
    }
}
