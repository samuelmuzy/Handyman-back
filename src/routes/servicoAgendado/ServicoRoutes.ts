import express from 'express';
import { ServicoController } from '../../controllers/servicoAgendado/ServicoController';
import { upload } from '../../config/multerConfig';

export const servicoRouter = express.Router();

const servicoController = new ServicoController();

servicoRouter.post('/',servicoController.criarServico);
servicoRouter.put('/',servicoController.atualizarStatus);
servicoRouter.get('/:idServico',servicoController.buscarServico);
servicoRouter.get('/:idServico/usuario',servicoController.buscarServicoComUsuario);
servicoRouter.post('/inserir-imagems/:id_servico',upload.single("imagem"),servicoController.inserirImagem);