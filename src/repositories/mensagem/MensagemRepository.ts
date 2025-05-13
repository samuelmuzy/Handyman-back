import { getTokenData } from "../../middlewares/Authenticator";
import { Fornecedor, IFornecedor } from "../../models/fornecedor/Fornecedor";
import { IMensagem, MensagemModel } from "../../models/mensagem/MensagemModel";
import { IUsuario, Usuario } from "../../models/usuario/Usuario";

export class MensagemRepository {
    private static instance: MensagemRepository;
    private modelUsuario;
    private modelFornecedor;

    private constructor() {
        this.modelUsuario = Usuario.getInstance().getModel();
        this.modelFornecedor = Fornecedor.getInstance().getModel();
    }

    public static getInstance(): MensagemRepository {
        if (!MensagemRepository.instance) {
            MensagemRepository.instance = new MensagemRepository();
        }
        return MensagemRepository.instance;
    }

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

    async buscarUsuariosConversa(idUsuario: string) {
        const destinatariosIds = await this.buscarDestinatarios(idUsuario);

        // Busca usuários e fornecedores que conversaram com o usuário
        const [usuarios, fornecedores] = await Promise.all([
            this.modelUsuario.find({
                id_usuario: { $in: destinatariosIds }
            }),
            this.modelFornecedor.find({
                id_fornecedor: { $in: destinatariosIds }
            })
        ]);

        // Combina os resultados em um único array
        return [...usuarios, ...fornecedores];
    }
}
