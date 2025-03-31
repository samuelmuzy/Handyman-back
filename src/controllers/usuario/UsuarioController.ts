import { Request, Response } from 'express';
import Usuario from '../../models/usuario/Usuario';


export class UsuarioController {
    
    public async criarUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { nome, sobrenome } = req.body;
            const novoUsuario = new Usuario({ nome, sobrenome });
            
            await novoUsuario.save();
            
            res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar usuário', details: error });
        }
    }

    public async listarUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await Usuario.find();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
        }
    }

    public async exibirPagina(req: Request, res: Response): Promise<void> {
        res.render('index', { titulo: 'Página de Usuários' });
    }
}


