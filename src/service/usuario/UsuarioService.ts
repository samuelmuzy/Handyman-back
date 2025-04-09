import { IUsuario } from "../../models/Usuario/Usuario";
import { UsuarioRepository } from "../../repositories/Usuario/UsuarioRepository";
import { typeUsuario } from "../../types/usuarioType";
import { CustomError } from "../CustomError";


export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository?: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository || new UsuarioRepository();
    }

    public async criarUsuario(usuario:typeUsuario): Promise<IUsuario> {
        try{
            if (!usuario.nome || !usuario.email) {
                throw new CustomError('Nome e sobrenome são obrigatórios', 400);
            }
            return await this.usuarioRepository.criar(usuario);
        }catch (error:unknown){
            if (error instanceof CustomError) {
                throw new CustomError(`Erro ao criar usuário: ${error.message}`, error.statusCode);
            } else {
                throw new CustomError('Erro desconhecido ao criar usuário',500);
            }
        }
    }
    public async buscar(){
        try{
            return await this.usuarioRepository.buscarPorId();
        }catch (error:unknown){
            if (error instanceof CustomError) {
                throw new CustomError(`Erro ao criar usuário: ${error.message}`, error.statusCode);
            } else {
                throw new CustomError('Erro desconhecido ao criar usuário',500);
            }
        }
    }
}
