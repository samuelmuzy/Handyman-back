import { Request, Response } from "express";
import { UsuarioService } from "../../service/usuario/UsuarioService";
import { CustomError } from "../../service/CustomError";
import { typeUsuario } from "../../types/usuarioType";

const usuarioService = new UsuarioService();

export class UsuarioController {
  public criarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, email, senha, telefone, formaPagamento } = req.body;

      const usuarioSalvar: typeUsuario = {
        nome,
        email,
        senha,
        telefone,
        formaPagamento,
      };

      const usuario = await usuarioService.criarUsuario(usuarioSalvar);

      res.status(201).json(usuario);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro desconhecido ao criar usuário" });
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
        res.status(500).json({ error: "Erro desconhecido ao criar usuário" });
      }
    }
  };

  public buscarUsuarios = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const usuarios = await usuarioService.buscarUsuario();
      res.status(200).json(usuarios);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro desconhecido ao criar usuário" });
      }
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { nome, email, telefone, senha, formaPagamento } = req.body;
      const usuarioAtualizado: typeUsuario = {
        nome,
        email,
        senha,
        telefone,
        formaPagamento,
      };
      const usuario = await usuarioService.updateUser(id, usuarioAtualizado);

      res.status(200).json(usuario);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Erro desconhecido ao atualizar usuário" });
      }
    }
  };
}
