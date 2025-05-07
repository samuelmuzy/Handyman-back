import { IMensagem } from "../../models/mensagem/MensagemModel";
import { MensagemRepository } from "../../repositories/mensagem/MensagemRepository";


export class MensagemService {
    private repository = new MensagemRepository();

    async enviarMensagem(dados: IMensagem): Promise<IMensagem> {
        return await this.repository.salvarMensagem(dados);
    }

    async listarConversas(usuario1: string, usuario2: string): Promise<IMensagem[]> {
        return await this.repository.buscarConversas(usuario1, usuario2);
    }
}
