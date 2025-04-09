import { compare } from "bcryptjs";
import { hash } from "../../middlewares/hashManager";
import { IUsuario } from "../../models/Usuario/Usuario";
import { UsuarioRepository } from "../../repositories/Usuario/UsuarioRepository";
import { typeUsuario } from "../../types/usuarioType";
import { CustomError } from "../CustomError";
import { generateToken } from "../../middlewares/Authenticator";


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

            const senhaHash = hash(usuario.senha);

            usuario.senha = await senhaHash;

            return await this.usuarioRepository.criar(usuario);
        }catch (error:unknown){
            if (error instanceof CustomError) {
                throw new CustomError(`Erro ao criar usuário: ${error.message}`, error.statusCode);
            } else {
                throw new CustomError('Erro desconhecido ao criar usuário',500);
            }
        }
    }

    public async login(email:string,senha:string){
        try{
            
            const user = await this.usuarioRepository.buscarEmail(email);

            if(!user){
                throw new CustomError('Email não encontrado',404);
            }
            console.log(user.senha);
            console.log(senha);
        
            const senhaCorreta = await compare(senha, user.senha);

            if (!senhaCorreta) {
                throw new CustomError('Senha incorreta', 401);
            }

            const token = generateToken({ id: user.senha, role: user.email });
            
            return token;  
        
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
