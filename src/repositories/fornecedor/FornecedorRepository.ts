import { IFornecedor, Fornecedor } from '../../models/fornecedor/Fornecedor';
import { typeFornecedor } from '../../types/fornecedorType';

export class FornecedorRepository {
  private model = new Fornecedor().getModel();

  public async criarFornecedor(
    fornecedor: typeFornecedor
  ): Promise<IFornecedor> {
    try {
      const fornecedorSalvar = new this.model(fornecedor);
      return await fornecedorSalvar.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar fornecedor: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao criar fornecedor");
      }
    }
  }

  public async buscarFornecedores() {
    try {
      return await this.model.find();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar fornecedores: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao buscar fornecedores");
      }
    }
  }

  public async buscarFornecedorPorId(id: string) {
    try {
      const fornecedor = await this.model.findOne({ id_fornecedor: id });
      return fornecedor;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar fornecedor: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao buscar fornecedor");
      }
    }
  }
  public async buscarFornecedoresPorCategoria(categoria_servico: string) {
    try {
      const fornecedores = await this.model.find({ categoria_servico: categoria_servico });
      return fornecedores;
    } catch (error: unknown) {
        if(error instanceof Error){
            throw new Error(`Error ao buscar fornecedores:${error.message}`)
        }else{
            throw new Error("Erro desconhecido ao buscar fornecedores");
        }  
    }
  }

  public async buscarFornecedorPorEmail(email: string) {
    try {
      const fornecedor = await this.model.findOne({ email });
      return fornecedor;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar fornecedor: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao buscar fornecedor");
      }
    }
  }

  public async atualizarFornecedor(id: string, dados: Partial<typeFornecedor>) {
    try {
      return await this.model.findOneAndUpdate({ id_fornecedor: id }, dados, {
        new: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar fornecedor: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao atualizar fornecedor");
      }
    }
  }

  public async deletarFornecedor(id: string) {
    try {
      return await this.model.findOneAndDelete({ id_fornecedor: id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao deletar fornecedor: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao deletar fornecedor");
      }
    }
  }

  public async adicionarSolicitacao(id: string, idSolicitacao: string) {
    try {
      return await this.model.findOneAndUpdate(
        { id_fornecedor: id },
        { $push: { solicitacoes: idSolicitacao } },
        { new: true }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao adicionar solicitação: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao adicionar solicitação");
      }
    }
  }

  public async atualizarDisponibilidade(id: string, disponibilidade: any) {
    try {
      return await this.model.findOneAndUpdate(
        { id_fornecedor: id },
        { $push: { disponibilidade } },
        { new: true }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar disponibilidade: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao atualizar disponibilidade");
      }
    }
  }

    public async adicionarImagensServico(id:string,idImagemServico:string){
        try {
            return await this.model.findOneAndUpdate(
                { id_fornecedor: id },
                { $push: { imagemServicos: idImagemServico } },
                { new: true }
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao adicionar solicitação: ${error.message}`);
            } else {
                throw new Error("Erro desconhecido ao adicionar solicitação");
            }
        }
    }
  

  public async atualizarMediaAvaliacoes(id: string, media: number) {
    try {
      return await this.model.findOneAndUpdate(
        { id_fornecedor: id },
        { media_avaliacoes: media },
        { new: true }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Erro ao atualizar média de avaliações: ${error.message}`
        );
      } else {
        throw new Error("Erro desconhecido ao atualizar média de avaliações");
      }
    }
  }
}
