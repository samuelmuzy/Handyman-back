import { FaqRepository } from '../../repositories/faq/FaqRepository';
import { BaseService } from '../BaseService';
import { CustomError } from '../CustomError';

export class FaqService extends BaseService {
    private repository: FaqRepository;

    constructor() {
        super();
        this.repository = new FaqRepository();
    }

    public async criarFaq(faq: { pergunta: string; resposta: string; palavrasChave?: string[] }) {
        try {
            this.validateRequiredFields(faq, ['pergunta', 'resposta']);
            return await this.repository.criarFaq(faq);
        } catch (error) {
            this.handleError(error);
        }
    }

    public async buscarFaqs(query?: string) {
        try {
            const faq = await this.repository.buscarFaqs(query);
            
            if(faq.length === 0) {
                throw new CustomError('Nenhum FAQ encontrado', 404);
            }

            return faq;
        } catch (error) {
            this.handleError(error);
        }
    }
} 