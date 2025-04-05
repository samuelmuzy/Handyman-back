import { IUsuario } from "../../models/Usuario/Usuario";
import { UsuarioRepository } from "../../repositories/usuario/UsuarioRepository";
import { CustomError } from "../CustomError";


export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository?: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository || new UsuarioRepository();
    }

    public async criarUsuario(nome: string, sobrenome: string): Promise<IUsuario> {
        try{
            if (!nome || !sobrenome) {
                throw new CustomError('Nome e sobrenome são obrigatórios', 400);
            }
            return await this.usuarioRepository.criar(nome, sobrenome);
        }catch (error:unknown){
            if (error instanceof CustomError) {
                throw new CustomError(`Erro ao criar usuário: ${error.message}`, error.statusCode);
            } else {
                throw new CustomError('Erro desconhecido ao criar usuário',500);
            }
        }

    }
}
