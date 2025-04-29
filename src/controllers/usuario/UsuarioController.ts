import { Request, Response } from 'express';
import { UsuarioService } from '../../service/usuario/UsuarioService';
import { CustomError } from '../../service/CustomError';
import { typeUsuario } from '../../types/usuarioType';

const usuarioService = new UsuarioService();

export class UsuarioController {
    public criarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nome, email, senha, telefone,endereco } = req.body;

            const usuarioSalvar: typeUsuario = {
                nome,
                email,
                senha,
                telefone,
                formaPagamento: [],
                endereco,
                historico_servicos: [],
            };

            const usuario = await usuarioService.criarUsuario(usuarioSalvar);

            res.status(201).json(usuario);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao criar usuário' });
            }
        }
    };

    public verificarEmailUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.query;
    
            if (typeof email !== 'string') {
                res.status(400).json({ error: 'Email inválido ou ausente' });
                return;
            }
    
            const existe = await usuarioService.verificarSeEmailExiste(email);
    
            res.status(200).json({ email, existe });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao verificar email' });
            }
        }
    };
    
    
    

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, senha } = req.body;

            const usuario = await usuarioService.login(email, senha);

            res.status(200).json({ token: usuario });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao criar usuário' });
            }
        }
    };

    public buscarUsuarios = async (req: Request,res: Response): Promise<void> => {
        try {
            const usuarios = await usuarioService.buscarUsuario();
            res.status(200).json(usuarios);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao criar usuário' });
            }
        }
    };

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { nome, email, telefone, senha, formaPagamento,endereco,historico_servicos } = req.body;
            const token = req.headers.authorization!;
            
            const usuarioAtualizado: typeUsuario = {
                nome,
                email,
                senha,
                telefone,
                formaPagamento,
                endereco,
                historico_servicos
            };
            const usuario = await usuarioService.updateUser(id, usuarioAtualizado,token);

            res.status(200).json(usuario);
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao atualizar usuário' });
            }
        }
    };
    public buscarHistoricoDeServicosPorId = async(req:Request,res:Response):Promise <void> =>{
        try {
            const {id} = req.params;
            const historico = await usuarioService.buscarHistoricoServicoPorId(id)
            res.status(200).json(historico);
        } catch (error:unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao buscar histórico de serviços' });
            }
        }
    }
}
