import mongoose, { Schema, Document } from 'mongoose';
import { BaseBancoDeDados } from '../../config/connection';

export interface IFaq extends Document {
    pergunta: string;
    resposta: string;
    palavrasChave: string[];
    dataCriacao: Date;
}

export class Faq extends BaseBancoDeDados {
    private schema: Schema<IFaq>;
    private model;

    constructor() {
        super();
        
        this.schema = new Schema<IFaq>({
            pergunta: { type: String, required: true },
            resposta: { type: String, required: true },
            palavrasChave: [{ type: String }],
            dataCriacao: { type: Date, default: Date.now }
        });

        this.model = mongoose.model<IFaq>('faqs', this.schema);
    }

    public getModel() {
        return this.model;
    }
} 