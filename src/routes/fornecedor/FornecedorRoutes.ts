import express from 'express';
import { FornecedorController } from '../../controllers/fornecedor/FornecedorController';

export const fornecedorRouter = express.Router();

const fornecedorController = new FornecedorController();

// Rotas públicas
fornecedorRouter.post('/', fornecedorController.criarFornecedor);
fornecedorRouter.post('/login', fornecedorController.login);

// Rotas protegidas
fornecedorRouter.get('/', fornecedorController.buscarFornecedores);
fornecedorRouter.get('/:id', fornecedorController.buscarFornecedorPorId);
fornecedorRouter.get('/categorias',fornecedorController.buscarFornecedorPorCategoria);
fornecedorRouter.put('/:id', fornecedorController.atualizarFornecedor);
fornecedorRouter.post('/:id/solicitacao', fornecedorController.adicionarSolicitacao);
fornecedorRouter.put('/:id/disponibilidade', fornecedorController.atualizarDisponibilidade);
fornecedorRouter.put('/:id/avaliacoes', fornecedorController.atualizarMediaAvaliacoes);
fornecedorRouter.delete('/:id', fornecedorController.deletarFornecedor); 