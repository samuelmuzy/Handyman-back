import { IAvaliacao } from "../../models/avaliacao/Avaliacao";
import { AvaliacaoRepositories } from "../../repositories/avaliacao/AvaliacaoRepositories";
import { typeAvaliacao } from "../../types/avaliacaoType";
import { BaseService } from "../BaseService";

export class AvaliacaoService extends BaseService {
    private repository: AvaliacaoRepositories;

    constructor() {
        super();
        this.repository = new AvaliacaoRepositories();
    }

    public async criarAvaliacao(avaliacao: typeAvaliacao): Promise<IAvaliacao> {
        try {
            this.validateRequiredFields(avaliacao, ['comentario', 'data', 'id_fornecedor', "id_servico", "id_usuario", "nota"]);
            const avaliarSalvar = await this.repository.criarAvaliacao(avaliacao);
            return avaliarSalvar;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    // Método para calcular média de avaliações de um fornecedor
    public async calcularMediaFornecedor(id_fornecedor: string) {
        try {
            const avaliacoes = await this.repository.calcularMediaFornecedor(id_fornecedor);
            if (avaliacoes.length === 0) return 0;
            
            const soma = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0);
            return soma / avaliacoes.length;
        } catch (error) {
            this.handleError(error);
        }
    }
}