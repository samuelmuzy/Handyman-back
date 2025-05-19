import { Iservico, ServicoModel } from "../../models/servicoAgendado/Servico";
import { typeServico } from "../../types/servicoType";

export class ServicoRepository {
    public async criarServico(servicoBody: typeServico):Promise<Iservico> {
        try {
            const servico = new ServicoModel(servicoBody);
            return await servico.save();

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao adicionar solicitação: ${error.message}`);
            } else {
                throw new Error("Erro desconhecido ao adicionar solicitação");
            }
        }
    }
}