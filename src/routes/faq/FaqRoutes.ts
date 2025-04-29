import { Router } from 'express';
import { FaqController } from '../../controllers/faq/FaqController';

const router = Router();
const controller = new FaqController();

router.post('/', controller.criarFaq.bind(controller));
router.get('/', controller.buscarFaqs.bind(controller));

export default router; 