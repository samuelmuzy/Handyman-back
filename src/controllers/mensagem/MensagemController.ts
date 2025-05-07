import { Request, Response } from 'express';
import { MensagemService } from '../../service/mensagem/MensagemService';


const service = new MensagemService();

export const MensagemController = {
    async enviar(req: Request, res: Response) {
        const { remetenteId, destinatarioId, texto } = req.body;

        try {
            const mensagem = await service.enviarMensagem({ remetenteId, destinatarioId, texto } as any);
            res.status(201).json(mensagem);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao enviar mensagem.' });
        }
    },

    async listar(req: Request, res: Response) {
        const { usuario1, usuario2 } = req.params;

        try {
            const mensagens = await service.listarConversas(usuario1, usuario2);
            res.status(200).json(mensagens);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar mensagens.' });
        }
    }
};
