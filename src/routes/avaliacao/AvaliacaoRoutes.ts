import { Router } from 'express';
import { AvaliacaoController } from '../../controllers/avaliacao/AvaliacaoController';


const avaliacaoRouter = Router();
const controller = new AvaliacaoController();

avaliacaoRouter.post('/', controller.criarAvaliacao.bind(controller));


export default avaliacaoRouter; 