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

        const [usuarios, fornecedores] = await Promise.all([
            this.modelUsuario.find(
                { id_usuario: { $in: destinatariosIds } },
            ).select('id_usuario nome picture'),

            this.modelFornecedor.find(
                { id_fornecedor: { $in: destinatariosIds } },
            ).select('id_fornecedor nome imagemPerfil')
        ]);

        const fornecedorRenomeados = fornecedores.map(f => ({
            id: f.id_fornecedor,
            nome: f.nome,
            picture: f.imagemPerfil
        }));

        const usuariosRenomeados = usuarios.map(u => ({
            id: u.id_usuario,
            nome: u.nome,
            picture: u.picture
        }));


        // Combina os resultados em um único array
        return [...usuariosRenomeados, ...fornecedorRenomeados];
    }
}
