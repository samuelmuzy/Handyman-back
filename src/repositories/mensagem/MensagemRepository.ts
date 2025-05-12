import { IMensagem, MensagemModel } from "../../models/mensagem/MensagemModel";


export class MensagemRepository {
    async salvarMensagem(dados: IMensagem): Promise<IMensagem> {
        const mensagem = new MensagemModel(dados);
        return await mensagem.save();
    }

    async buscarConversas(remetenteId: string, destinatarioId: string): Promise<IMensagem[]> {
        return await MensagemModel.find({
            $or: [
                { remetenteId, destinatarioId },
                { remetenteId: destinatarioId, destinatarioId: remetenteId }
            ]
        }).sort({ dataEnvio: 1 });
    }

    async buscarDestinatarios(remetenteId: string): Promise<string[]> {
        const mensagens = await MensagemModel.find({
            $or: [
                { remetenteId },
                { destinatarioId: remetenteId }
            ]
        });

        const destinatarios = new Set<string>();
        
        mensagens.forEach(mensagem => {
            if (mensagem.remetenteId === remetenteId) {
                destinatarios.add(mensagem.destinatarioId);
            } else {
                destinatarios.add(mensagem.remetenteId);
            }
        });

        return Array.from(destinatarios);
    }
}
