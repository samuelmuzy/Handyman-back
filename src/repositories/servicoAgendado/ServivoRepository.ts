import { Iservico, ServicoModel } from "../../models/servicoAgendado/Servico";
import { typeServico, ServicoComFornecedor } from "../../types/servicoType";
import { Fornecedor } from "../../models/fornecedor/Fornecedor";

export class ServicoRepository {
    private fornecedorModel = Fornecedor.getInstance().getModel();

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

    public async buscarServicosPorUsuarioId(id_usuario:string):Promise<ServicoComFornecedor[] | null> {
        try {
            const servicos = await ServicoModel.find({ id_usuario });
            
            // Buscar informações dos fornecedores para cada serviço
            const servicosComFornecedor = await Promise.all(
                servicos.map(async (servico) => {
                    const fornecedor = await this.fornecedorModel.findOne({ 
                        id_fornecedor: servico.id_fornecedor 
                    });
                    
                    const servicoObj = servico.toObject();
                    
                    return {
                        id_servico: servicoObj.id_servico,
                        id_usuario: servicoObj.id_usuario,
                        categoria: servicoObj.categoria,
                        data: servicoObj.data,
                        horario: servicoObj.horario,
                        status: servicoObj.status,
                        id_pagamento: servicoObj.id_pagamento,
                        id_avaliacao: servicoObj.id_avaliacao,
                        descricao: servicoObj.descricao,
                        fornecedor: fornecedor ? {
                            nome: fornecedor.nome,
                            email: fornecedor.email,
                            telefone: fornecedor.telefone,
                            categoria_servico: fornecedor.categoria_servico,
                            media_avaliacoes: fornecedor.media_avaliacoes
                        } : null
                    };
                })
            );

            return servicosComFornecedor;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar serviços: ${error.message}`);
            } else {
                throw new Error("Erro desconhecido ao buscar serviços");
            }
        }
    }

    public async atualizarStatus(id_servico:string,dadosAtualizados:Partial<typeServico>){
        try {
            return await ServicoModel.findOneAndUpdate(
                { id_servico }, // busca pelo campo "id_usuario"
                { $set: dadosAtualizados},
                { new: true, runValidators: true }
            );

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao alterar status: ${error.message}`);
            } else {
                throw new Error("Erro desconhecido ao alterar status");
            }
        }
    }

    public async buscarServico(id_servico: string): Promise<ServicoComFornecedor | null> {
        try {
            const servico = await ServicoModel.findOne({ id_servico });
            
            if (!servico) {
                return null;
            }

            const fornecedor = await this.fornecedorModel.findOne({ 
                id_fornecedor: servico.id_fornecedor 
            });
            
            const servicoObj = servico.toObject();
            
            return {
                id_servico: servicoObj.id_servico,
                id_usuario: servicoObj.id_usuario,
                categoria: servicoObj.categoria,
                data: servicoObj.data,
                horario: servicoObj.horario,
                status: servicoObj.status,
                id_pagamento: servicoObj.id_pagamento,
                id_avaliacao: servicoObj.id_avaliacao,
                descricao: servicoObj.descricao,
                fornecedor: fornecedor ? {
                    nome: fornecedor.nome,
                    email: fornecedor.email,
                    telefone: fornecedor.telefone,
                    categoria_servico: fornecedor.categoria_servico,
                    media_avaliacoes: fornecedor.media_avaliacoes
                } : null
            };

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar serviço: ${error.message}`);
            } else {
                throw new Error("Erro desconhecido ao buscar serviço");
            }
        }
    }
}