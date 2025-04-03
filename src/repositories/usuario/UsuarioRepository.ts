import { IUsuario, Usuario } from "../../models/Usuario/Usuario";



export class UsuarioRepository {
    private model = new Usuario().getModel();

    public async criar(nome: string, sobrenome: string): Promise<IUsuario> {
        try {
            const usuario = new this.model({ nome, sobrenome });

            return await usuario.save();
        } catch (error:unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar usuário: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao criar usuário');
            }
        }
    }

    public async buscarPorId(id: string): Promise<IUsuario | null> {
        return await this.model.findById(id).exec();
    }
}
