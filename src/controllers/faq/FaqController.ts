import { Request, Response } from 'express';
import { FaqService } from '../../service/faq/FaqService';

export class FaqController {
    private service: FaqService;

    constructor() {
        this.service = new FaqService();
    }

    public async criarFaq(req: Request, res: Response) {
        try {
            const faq = await this.service.criarFaq(req.body);
            res.status(201).json(faq);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    public async buscarFaqs(req: Request, res: Response) {
        try {
            const query = req.query.query as string | undefined;
            const faqs = await this.service.buscarFaqs(query);
            res.status(200).json(faqs);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }
} 