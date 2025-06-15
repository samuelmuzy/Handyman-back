import { Request, Response } from "express";
import { CustomError } from "../../service/CustomError";
import { typeAvaliacao } from "../../types/avaliacaoType";
import { AvaliacaoService } from "../../service/avaliacao/AvaliacaoService";
import { ServicoService } from "../../service/servicoAgendado/ServicoService";


export class AvaliacaoController {
    private service: AvaliacaoService;
    private servicoService: ServicoService;

    constructor() {
        this.service = new AvaliacaoService();
        this.servicoService = new ServicoService();
    }

    public async criarAvaliacao(req: Request, res: Response) {
        try {
            const { id_servico, id_usuario, id_fornecedor, nota, comentario, data } = req.body;
            
            
            const avaliacao: typeAvaliacao = {
                id_servico,
                id_usuario,
                id_fornecedor,
                nota,
                comentario,
                data: data || new Date()
            }
            const avaliado = true
            
            this.servicoService.atualizarStatus(id_servico, { avaliado })

            const avaliacaoSucesso = await this.service.criarAvaliacao(avaliacao);
            res.status(201).json(avaliacaoSucesso);

        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ 
                    error: error.message,
                    details: error.details 
                });
            } else {
                res.status(500).json({ 
                    error: 'Erro interno do servidor',
                    details: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        }
    }
}