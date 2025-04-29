import { IFaq, Faq } from '../../models/faq/Faq';

export class FaqRepository {
    private model = new Faq().getModel();

    public async criarFaq(faq: { pergunta: string; resposta: string; palavrasChave?: string[] }): Promise<IFaq> {
        try {
            const faqSalvar = new this.model(faq);
            return await faqSalvar.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao criar FAQ: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao criar FAQ');
            }
        }
    }

    public async buscarFaqs(query?: string): Promise<IFaq[]> {
        try {
            if (query) {
                const regex = new RegExp(query, 'i');
                return await this.model.find({
                    $or: [
                        { pergunta: regex },
                        { palavrasChave: regex }
                    ]
                }).sort({ pergunta: 1 });
            }
            return await this.model.find().sort({ pergunta: 1 });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar FAQs: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao buscar FAQs');
            }
        }
    }
} 