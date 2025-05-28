import { Avaliacao, IAvaliacao } from "../../models/avaliacao/Avaliacao";
import { Fornecedor } from "../../models/fornecedor/Fornecedor";
import { typeAvaliacao } from "../../types/avaliacaoType";

export class AvaliacaoRepositories{
    private model = new Avaliacao().getModel();
    private fornecedorModel = Fornecedor.getInstance().getModel();

    public async criarAvaliacao(avaliacao:typeAvaliacao): Promise<IAvaliacao> {
        try {
            const avaliacaoSalvar = new this.model(avaliacao);
            const avaliacaoSalva = await avaliacaoSalvar.save();
            
            // Atualiza a média de avaliações do fornecedor
            await this.atualizarMediaFornecedor(avaliacao.id_fornecedor);
            
            return avaliacaoSalva;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar avaliação: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao criar avaliação');
            }
        }
    }

      // Método para calcular média de avaliações de um fornecedor
      public async calcularMediaFornecedor(id_fornecedor: string) {
        try {
            const avaliacoes = await this.model.find({ id_fornecedor });
            return avaliacoes;
        } catch (error) {
            throw new Error(`Erro ao calcular média: ${error}`);
        }
    }

    // Método para atualizar a média de avaliações do fornecedor
    private async atualizarMediaFornecedor(id_fornecedor: string) {
        try {
            const avaliacoes = await this.model.find({ id_fornecedor });
            if (avaliacoes.length === 0) return;

            const soma = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0);
            const media = soma / avaliacoes.length;

            // Atualiza a média no documento do fornecedor usando id_fornecedor
            await this.fornecedorModel.findOneAndUpdate(
                { id_fornecedor },
                { media_avaliacoes: media }
            );
        } catch (error) {
            throw new Error(`Erro ao atualizar média do fornecedor: ${error}`);
        }
    }
}