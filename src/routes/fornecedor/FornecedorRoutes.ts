import express from 'express';
import { FornecedorController } from '../../controllers/fornecedor/FornecedorController';
import { upload } from '../../config/multerConfig';


export const fornecedorRouter = express.Router();

const fornecedorController = new FornecedorController();

// Rotas públicas
fornecedorRouter.post('/', fornecedorController.criarFornecedor);
fornecedorRouter.post('/login', fornecedorController.login);
fornecedorRouter.get('/verificar-email/fornecedor',fornecedorController.verificarEmailFornecedor);

// Rotas protegidas
fornecedorRouter.get('/', fornecedorController.buscarFornecedores);
fornecedorRouter.post('/salvar-imagem-perfil/:id_fornecedor', upload.single("imagem"), fornecedorController.uploadImagemPerfil);
fornecedorRouter.post('/salvar-imagem-ilustrativa/:id_fornecedor', upload.single("imagem"), fornecedorController.uploadImagemIlustrativa);
fornecedorRouter.post('/salvar-imagem-servico/:id_fornecedor',upload.single("imagem"),fornecedorController.uploadImagemServisos);
fornecedorRouter.get('/:id', fornecedorController.buscarFornecedorPorId);
fornecedorRouter.get('/categorias',fornecedorController.buscarFornecedorPorCategoria);
fornecedorRouter.put('/:id', fornecedorController.atualizarFornecedor);
fornecedorRouter.post('/:id/solicitacao', fornecedorController.adicionarSolicitacao);
fornecedorRouter.put('/:id/disponibilidade', fornecedorController.atualizarDisponibilidade);
fornecedorRouter.put('/:id/avaliacoes', fornecedorController.atualizarMediaAvaliacoes);
fornecedorRouter.delete('/:id', fornecedorController.deletarFornecedor); 