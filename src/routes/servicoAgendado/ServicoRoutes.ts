import express from 'express';
import { ServicoController } from '../../controllers/servicoAgendado/ServicoController';

export const servicoRouter = express.Router();

const servicoController = new ServicoController();

servicoRouter.post('/',servicoController.criarServico);
servicoRouter.put('/',servicoController.atualizarStatus);