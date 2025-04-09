import { IUsuario, Usuario } from "../../models/Usuario/Usuario";
import { typeUsuario } from "../../types/usuarioType";

export class UsuarioRepository {
    private model = new Usuario().getModel();

    public async criar(usuario:typeUsuario): Promise<IUsuario> {
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

    public async buscarPorId() {
        return await this.model.find();
    }

    public async buscarEmail(email:string){
        
        const usuario = await this.model.findOne({ email: email });
        return usuario;
    }
}
