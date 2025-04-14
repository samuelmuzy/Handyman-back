import { IUsuario, Usuario } from "../../models/usuario/Usuario";
import { typeUsuario } from "../../types/usuarioType";

export class UsuarioRepository {
    private model = new Usuario().getModel();

    public async criarUsuario(usuario:typeUsuario): Promise<IUsuario> {
        try {
            const usuarioSalvar = new this.model( usuario );

            return await usuarioSalvar.save();
        } catch (error:unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar usuário: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao criar usuário');
            }
        }
    }

    public async updateUser(id: string, dadosAtualizados: Partial<typeUsuario>): Promise<IUsuario | null> {
        try {
            return await this.model.findByIdAndUpdate(
                id,
                { $set: dadosAtualizados },
                { new: true, runValidators: true }
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao atualizar usuário: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao atualizar usuário');
            }
        }
    }
    
    

    public async buscarUsuarios() {
        try{
            return await this.model.find();
        } catch (error:unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar usuário: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao criar usuário');
            }
        }
    }

    public async buscarPorId(id: string): Promise<IUsuario | null> {
        try {
            return await this.model.findById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao buscar usuário por ID');
            }
        }
    }    

    public async buscarEmail(email:string){
        try{
            const usuario = await this.model.findOne({ email: email });
            return usuario;

        }catch (error:unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar usuário: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao criar usuário');
            }
        }
    }
}
