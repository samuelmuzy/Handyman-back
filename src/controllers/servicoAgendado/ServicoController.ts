import { Request, Response } from "express";
import { CustomError } from "../../service/CustomError";
import { ServicoService } from "../../service/servicoAgendado/ServicoService";
import { typeServico } from "../../types/servicoType";
import { generateId } from "../../middlewares/generateId";
import { io } from "../../index";
import { uploadImagemBuffer } from "../../service/cloudinaryService";
import { SocketConfig } from "../../config/Socket";


export class ServicoController {
    private servicoService = new ServicoService();
    public criarServico = async (req: Request, res: Response) => {
        try {
            const {
                id_usuario,
                id_fornecedor,
                categoria,
                data,
                horario,
                status,
                valor,
                id_pagamento,
                id_avaliacao,
                descricao
            } = req.body;

            // Validação das datas
            const dataServico = new Date(data);
            const horarioServico = new Date(horario);

            if (isNaN(dataServico.getTime())) {
                throw new CustomError("Data inválida", 400);
            }

            if (isNaN(horarioServico.getTime())) {
                throw new CustomError("Horário inválido", 400);
            }

            const servicoBody: typeServico = {
                id_servico: generateId(),
                id_usuario,
                id_fornecedor,
                categoria,
                valor,
                data: dataServico,
                horario: horarioServico,
                data_submisao: new Date(),
                status,
                id_pagamento,
                id_avaliacao,
                descricao
            };

            const servico = await this.servicoService.criarServico(servicoBody);
            res.status(201).json(servico);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };

    public atualizarStatus = async (req: Request, res: Response) => {
        try {
            const { id_servico, status } = req.body;

            const data_submisao = new Date();

            const dados = await this.servicoService.atualizarStatus(id_servico, { status, data_submisao });

            // Busca informações adicionais do serviço para enviar no socket
            const servico = await this.servicoService.buscarServico(id_servico);

            if (!servico) {
                throw new CustomError("Serviço não encontrado", 404);
            }

            // Emite o evento de mudança de status para o usuário e fornecedor
            io.to(servico.id_usuario).emit('atualizacao_status', {
                id_servico,
                novo_status: status,
                timestamp: new Date()
            });

            io.to(servico.id_fornecedor as string).emit('atualizacao_status', {
                id_servico,
                novo_status: status,
                timestamp: new Date()
            });

            res.status(200).send(dados);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };

    public buscarServico = async (req: Request, res: Response) => {
        try {
            const { idServico } = req.params;

            const dados = await this.servicoService.buscarServico(idServico);

            res.status(200).send(dados);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };

    public inserirImagem = async (req: Request, res: Response) => {

        try {
            const { id_servico } = req.params;


            if (!req.file) {
                res.status(400).json({ error: 'Imagem não enviada' });
                return;
            }

            const imagems = await uploadImagemBuffer(req.file.buffer, 'fornecedores');

            console.log(imagems)

            await this.servicoService.atualizarImagemServico(id_servico, imagems);

            res.status(200).json({ imagem: imagems });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    }

    public buscarServicoComUsuario = async (req: Request, res: Response) => {
        try {
            const { idServico } = req.params;

            const dados = await this.servicoService.buscarServicoComUsuario(idServico);

            if (!dados) {
                throw new CustomError("Serviço não encontrado", 404);
            }

            res.status(200).send(dados);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };

    public atualizarValorServico = async (req: Request, res: Response) => {
        try {
            const { id_servico, valor } = req.body;

            if (!id_servico || !valor) {
                throw new CustomError("ID do serviço e valor são obrigatórios", 400);
            }

            if (isNaN(Number(valor)) || Number(valor) <= 0) {
                throw new CustomError("Valor inválido", 400);
            }

            const servicoAtualizado = await this.servicoService.atualizarValorServico(id_servico, Number(valor));
            
            // Emite o evento de atualização de valor
            io.to(servicoAtualizado.id_usuario).emit('valor_atualizado', {
                id_servico,
                novo_valor: Number(valor),
                novo_status: 'confirmar valor',
                timestamp: new Date()
            });

            io.to(servicoAtualizado.id_fornecedor as string).emit('valor_atualizado', {
                id_servico,
                novo_valor: Number(valor),
                novo_status: 'confirmar valor',
                timestamp: new Date()
            });
            
            res.status(200).json(servicoAtualizado);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao atualizar valor do serviço' });
            }
        }
    };
}