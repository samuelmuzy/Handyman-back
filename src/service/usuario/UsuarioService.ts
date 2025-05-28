import { compare } from 'bcryptjs';
import { hash } from '../../middlewares/hashManager';
import { IUsuario } from '../../models/usuario/Usuario';
import { UsuarioRepository } from '../../repositories/usuario/UsuarioRepository';
import { typeUsuario, typeUsuarioGoogle } from '../../types/usuarioType';
import { CustomError } from '../CustomError';
import { generateToken, getTokenData } from '../../middlewares/Authenticator';
import { BaseService } from '../BaseService';
import { ServicoRepository } from '../../repositories/servicoAgendado/ServivoRepository';
import { FornecedorRepository } from '../../repositories/fornecedor/FornecedorRepository';
import { Iservico } from '../../models/servicoAgendado/Servico';
import { ServicoComFornecedor } from '../../types/servicoType';

export class UsuarioService extends BaseService {
    private usuarioRepository: UsuarioRepository;

    private servicoRepository = new ServicoRepository();

    private fornecedorRepository = new FornecedorRepository();

    constructor(usuarioRepository?: UsuarioRepository) {
        super();
        this.usuarioRepository = usuarioRepository || new UsuarioRepository();
    }

    public async criarUsuario(usuario: typeUsuario): Promise<IUsuario> {
        try {
            this.validateRequiredFields(usuario, [
                'email',
                'formaPagamento',
                'nome',
                'senha',
                'telefone',
            ]);

            const emailExiste = await this.usuarioRepository.buscarEmail(
                usuario.email
            );

            if (emailExiste) {
                throw new CustomError('Email já existe', 400);
            }

            const senhaHash = hash(usuario.senha);

            usuario.senha = await senhaHash;

            return await this.usuarioRepository.criarUsuario(usuario);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async criarUsuarioGoogle(usuario: typeUsuarioGoogle): Promise<string> {
        try {
            this.validateRequiredFields(usuario, [
                'email',
                'nome',
                'sub',
                'picture',
            ]);

            const emailExiste = await this.usuarioRepository.buscarEmail(
                usuario.email
            );
            

            if (emailExiste) {
                const token = generateToken({ id: emailExiste.id_usuario, email:usuario.email,imagemPerfil:usuario.picture,nome:usuario.nome, role: usuario.autenticacaoVia });
                
                return token;
            }

            const token = generateToken({ id: usuario.id_usuario, email:usuario.email,imagemPerfil:usuario.picture,nome:usuario.nome, role: usuario.autenticacaoVia });

            await this.usuarioRepository.criarUsuarioGoogle(usuario);

            return token;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async login(email: string, senha: string): Promise<string> {
        try {
            const user = await this.usuarioRepository.buscarEmail(email);

            if (!user) {
                throw new CustomError('Email ou senha incorretos', 401);
            }

            if (!user.senha) {
                throw new CustomError('Email ou senha incorretos', 401);
            }

            const senhaCorreta = await compare(senha, user.senha);

            if (!senhaCorreta) {
                throw new CustomError('Email ou senha incorretos', 401);
            }

            const token = generateToken({ 
                id: user.id_usuario, 
                email: user.email,
                imagemPerfil: user.picture,
                nome: user.nome, 
                role: user.role 
            });

            return token;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async buscarUsuario(): Promise<typeUsuario[]> {
        try {
            const usuarios = await this.usuarioRepository.buscarUsuarios();

            if (usuarios.length === 0) {
                throw new CustomError('Nenhum usuário encontrado', 404);
            }

            return usuarios;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async buscarUsuarioPorId(id:string): Promise<IUsuario> {
        try {
            const usuarios = await this.usuarioRepository.buscarPorId(id);

            if (!usuarios) {
                throw new CustomError('Nenhum usuário encontrado', 404);
            }

            return usuarios;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async updateUser(
        id: string,
        user: Partial<typeUsuario>,
        token:string
    ): Promise<IUsuario> {
        try{
            const verifyToken = getTokenData(token);
            

            if(!verifyToken){
                throw new CustomError('sem autorização',403);
            }

            const usuarioExistente = await this.usuarioRepository.buscarPorId(id);
    
            if (!usuarioExistente) {
                throw new CustomError('Usuário não encontrado', 404);
            }
    
            if (user.senha) {
                user.senha = await hash(user.senha);
            }
    
            const usuarioAtualizado = await this.usuarioRepository.updateUser(id, user);
    
            if (!usuarioAtualizado) {
                throw new CustomError('Erro ao atualizar usuário: registro não encontrado', 404);
            }
    
            return usuarioAtualizado;
        }catch(error: unknown) {
            this.handleError(error);
        }
    }

    public async verificarSeEmailExiste(email: string): Promise<boolean> {
        try {
            const usuario = await this.usuarioRepository.buscarEmail(email);
            if(usuario){
                throw new CustomError("Esse endereço de email já está em uso",404);
            }

            return true;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }
    
    public async buscarHistoricoServicoPorId (id:string):Promise<ServicoComFornecedor[] | null>{
        try {
            const user = await this.usuarioRepository.buscarPorId(id);
            
            if(!user){
                throw new CustomError('Usuário não encontrado',404);
            }

            const servicos = await this.servicoRepository.buscarServicosPorUsuarioId(id);

            if(!servicos || servicos.length === 0){
                throw new CustomError('Nenhum serviço encontrado',404);
            }

            return servicos;
        } catch (error:unknown) {
            this.handleError(error);
        }
    }
}
