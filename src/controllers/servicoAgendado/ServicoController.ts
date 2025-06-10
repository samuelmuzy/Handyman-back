import { Request, Response } from "express";
import { CustomError } from "../../service/CustomError";
import { ServicoService } from "../../service/servicoAgendado/ServicoService";
import { typeServico } from "../../types/servicoType";
import { generateId } from "../../middlewares/generateId";
import { io } from "../../index";

export class ServicoController{
    private servicoService = new ServicoService();
    public criarServico = async (req: Request, res: Response) => {
        try{
            const {
                id_usuario,
                id_fornecedor,
                categoria,
                data,
                horario,
                status,
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
        }catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };

    public atualizarStatus = async (req: Request, res: Response) => {
        try{
            const { id_servico, status } = req.body;

            const data_submisao = new Date();

            const dados = await this.servicoService.atualizarStatus(id_servico, { status,data_submisao });

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
        }catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };

    public buscarServico = async (req: Request, res: Response) => {
        try{
            const { idServico } = req.params;

            const dados = await this.servicoService.buscarServico(idServico);

            res.status(200).send(dados);
        }catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    };
}