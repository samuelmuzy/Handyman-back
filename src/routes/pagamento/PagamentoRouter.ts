import express from 'express';
import { PagamentoController } from "../../controllers/pagamento/pagamentoController";

export const pagamentoRouter = express.Router();

const pagamentoController = new PagamentoController();

pagamentoRouter.post('/pix',pagamentoController.pagarComPix);
pagamentoRouter.post('/cartao',pagamentoController.pagarComCartao);
