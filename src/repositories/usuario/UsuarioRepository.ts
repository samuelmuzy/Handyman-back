import { IUsuario, Usuario } from "../../models/Usuario/Usuario";
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
