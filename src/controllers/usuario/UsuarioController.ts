import { Request, Response } from 'express';
import { UsuarioService } from '../../service/Usuario/UsuarioService';
import { CustomError } from '../../service/CustomError';


const usuarioService = new UsuarioService();

export class UsuarioController {
    public criar = async (req: Request, res: Response):Promise<void> => {
        try {
            const { nome, sobrenome } = req.body;
            const usuario = await usuarioService.criarUsuario(nome, sobrenome);

            res.status(201).json(usuario); 
        } catch (error:unknown) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido ao criar usuário' });
            }
        }
    };
}
