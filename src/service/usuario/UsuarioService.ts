import { compare } from "bcryptjs";
import { hash } from "../../middlewares/hashManager";
import { IUsuario } from "../../models/usuario/Usuario";
import { UsuarioRepository } from "../../repositories/usuario/UsuarioRepository";
import { typeUsuario } from "../../types/usuarioType";
import { CustomError } from "../CustomError";
import { generateToken } from "../../middlewares/Authenticator";
import { BaseService } from "../BaseService";

export class UsuarioService extends BaseService {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository?: UsuarioRepository) {
    super();
    this.usuarioRepository = usuarioRepository || new UsuarioRepository();
  }

  public async criarUsuario(usuario: typeUsuario): Promise<IUsuario> {
    try {
      this.validateRequiredFields(usuario, [
        "email",
        "formaPagamento",
        "nome",
        "senha",
        "telefone",
      ]);

      const emailExiste = await this.usuarioRepository.buscarEmail(
        usuario.email
      );

      if (emailExiste) {
        throw new CustomError("Email já existe", 400);
      }

      const senhaHash = hash(usuario.senha);

      usuario.senha = await senhaHash;

      return await this.usuarioRepository.criarUsuario(usuario);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw new CustomError(
          `Erro ao criar usuário: ${error.message}`,
          error.statusCode
        );
      } else {
        throw new CustomError("Erro desconhecido", 500);
      }
    }
  }

  public async login(email: string, senha: string): Promise<string> {
    try {
      const user = await this.usuarioRepository.buscarEmail(email);

      if (!user) {
        throw new CustomError("Email não encontrado", 404);
      }

      const senhaCorreta = await compare(senha, user.senha);

      if (!senhaCorreta) {
        throw new CustomError("Senha incorreta", 401);
      }

      const token = generateToken({ id: user.senha, role: user.email });

      return token;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.statusCode);
      } else {
        throw new CustomError("Erro desconhecido ao criar usuário", 500);
      }
    }
  }

  public async buscarUsuario(): Promise<typeUsuario[]> {
    try {
      const usuarios = await this.usuarioRepository.buscarUsuarios();

      if (usuarios.length === 0) {
        throw new CustomError("Nenhum usuário encontrado", 404);
      }

      return usuarios;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.statusCode);
      } else {
        throw new CustomError("Erro desconhecido", 500);
      }
    }
  }
  public async updateUser(
    id: string,
    user: Partial<typeUsuario>
  ): Promise<IUsuario> {
    const usuarioExistente = await this.usuarioRepository.buscarPorId(id);
  
    if (!usuarioExistente) {
      throw new CustomError("Usuário não encontrado", 404);
    }
  
    if (user.senha) {
      user.senha = await hash(user.senha);
    }
  
    const usuarioAtualizado = await this.usuarioRepository.updateUser(id, user);
  
    if (!usuarioAtualizado) {
      throw new CustomError("Erro ao atualizar usuário: registro não encontrado", 404);
    }
  
    return usuarioAtualizado;
  }
  
  catch(error: unknown) {
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode);
    } else {
      throw new CustomError("Erro desconhecido ao atualizar usuário", 500);
    }
  }
}
