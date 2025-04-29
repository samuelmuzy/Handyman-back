import { Request, Response } from 'express';
import { FornecedorService } from '../../service/fornecedor/FornecedorService';
import { CustomError } from '../../service/CustomError';
import { typeFornecedor } from '../../types/fornecedorType';

const fornecedorService = new FornecedorService();

export class FornecedorController {
    public criarFornecedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nome, email, telefone, senha, endereco, categoria_servico, descricao } = req.body;

            const fornecedorSalvar: typeFornecedor = {
                nome,
                email,
                telefone,
                senha,
                endereco,
                categoria_servico,
                descricao,
                disponibilidade: [],
                solicitacoes: [],
                media_avaliacoes: 0
            };

            const fornecedor = await fornecedorService.criarFornecedor(fornecedorSalvar);
            res.status(201).json(fornecedor);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao criar fornecedor' });
            }
        }
    };

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, senha } = req.body;
            const token = await fornecedorService.login(email, senha);
            res.status(200).json({ token });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao fazer login' });
            }
        }
    };

    public buscarFornecedores = async (req: Request, res: Response): Promise<void> => {
        try {
            const fornecedores = await fornecedorService.buscarFornecedores();
            res.status(200).json(fornecedores);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao buscar fornecedores' });
            }
        }
    };

    public buscarFornecedorPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const fornecedor = await fornecedorService.buscarFornecedorPorId(id);
            res.status(200).json(fornecedor);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao buscar fornecedor' });
            }
        }
    };

    public buscarFornecedorPorCategoria = async(req:Request,res:Response):Promise<void> =>{
        try {
            const {id}=req.params;
            const fornecedores =await fornecedorService.buscarFornecedorPorCategoria(id)
            res.status(200).json(fornecedores);
        } catch (error:unknown) {
            if(error instanceof CustomError){
                res.status(error.statusCode).json({error:error.message})
            }else{
                res.status(500).json({error:'Erro desconhecido ao buscar'})
            }
        }
    }

    public atualizarFornecedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const dados = req.body;
            
            const fornecedor = await fornecedorService.atualizarFornecedor(id, dados);
            
            res.status(200).json(fornecedor);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao atualizar fornecedor' });
            }
        }
    };

    public adicionarSolicitacao = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { idSolicitacao } = req.body;
            
            await fornecedorService.adicionarSolicitacao(id, idSolicitacao);
            
            res.status(200).json({ message: 'Solicitação adicionada com sucesso' });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao adicionar solicitação' });
            }
        }
    };

    public atualizarDisponibilidade = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { disponibilidade } = req.body;
            await fornecedorService.atualizarDisponibilidade(id, disponibilidade);
            res.status(200).json({ message: 'Disponibilidade atualizada com sucesso' });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao atualizar disponibilidade' });
            }
        }
    };

    public atualizarMediaAvaliacoes = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { media } = req.body;
            await fornecedorService.atualizarMediaAvaliacoes(id, media);
            res.status(200).json({ message: 'Média de avaliações atualizada com sucesso' });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao atualizar média de avaliações' });
            }
        }
    };

    public deletarFornecedor = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await fornecedorService.deletarFornecedor(id);
            res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao deletar fornecedor' });
            }
        }
    };
} 