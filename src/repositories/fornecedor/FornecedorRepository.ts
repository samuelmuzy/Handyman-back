import { IFornecedor, Fornecedor } from '../../models/fornecedor/Fornecedor';
import { typeFornecedor } from '../../types/fornecedorType';
import { ServicoModel } from '../../models/servicoAgendado/Servico';
import { Usuario } from '../../models/usuario/Usuario';

export class FornecedorRepository {
  private model = Fornecedor.getInstance().getModel();
  private servicoModel = ServicoModel;
  private usuarioModel = Usuario.getInstance().getModel();

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
      if (error instanceof Error) {
        throw new Error(`Error ao buscar fornecedores:${error.message}`)
      } else {
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

  public async adicionarImagensServico(id: string, idImagemServico: string) {
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

  public async buscarSolicitacoesPorIdFornecedor(id_fornecedor: string) {
    try {
      // Buscar todos os serviços do fornecedor
      const servicos = await this.servicoModel.find({ id_fornecedor });

      // Para cada serviço, buscar os dados do usuário
      const servicosComUsuario = await Promise.all(
        servicos.map(async (servico) => {
          const usuario = await this.usuarioModel.findOne({ 
            id_usuario: servico.id_usuario 
          });

          return {
            servico: {
              id_servico: servico.id_servico,
              categoria: servico.categoria,
              data: servico.data,
              horario: servico.horario,
              status: servico.status,
              data_submisao:servico.data_submisao,
              descricao: servico.descricao,
              id_pagamento: servico.id_pagamento,
              id_avaliacao: servico.id_avaliacao
            },
            usuario: usuario ? {
              nome: usuario.nome,
              email: usuario.email,
              telefone: usuario.telefone,
              picture: usuario.picture
            } : null
          };
        })
      );

      return servicosComUsuario;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar solicitações: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao buscar solicitações");
      }
    }
  }
}
