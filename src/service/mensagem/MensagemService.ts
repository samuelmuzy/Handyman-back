import { getTokenData } from "../../middlewares/Authenticator";
import { IMensagem } from "../../models/mensagem/MensagemModel";
import { MensagemRepository } from "../../repositories/mensagem/MensagemRepository";
import { BaseService } from "../BaseService";
import { CustomError } from "../CustomError";


export class MensagemService extends BaseService  {
    private repository = MensagemRepository.getInstance();

    async enviarMensagem(dados: IMensagem): Promise<IMensagem> {
        return await this.repository.salvarMensagem(dados);
    }

    async listarConversas(usuario1: string, usuario2: string): Promise<IMensagem[]> {
        return await this.repository.buscarConversas(usuario1, usuario2);
    }

    async buscarDestinatarios(usuarioId: string) {
        // No seu controller ou service
        const destinatarios = await this.repository.buscarDestinatarios(usuarioId);
        return destinatarios;
    }

    async buscarUsuariosConversa(idUsuario: string, token: string) {
        try{
            const verifyToken = getTokenData(token);
    
            if (!verifyToken) {
                throw new CustomError('sem autorização', 403);
            }
    
            if(verifyToken.id !== idUsuario){
                throw new CustomError('sem autorização', 403);
            }
    
            const usuarios = await this.repository.buscarUsuariosConversa(idUsuario);
            return usuarios

        }catch(error){
            this.handleError(error);
        }
    }
}
