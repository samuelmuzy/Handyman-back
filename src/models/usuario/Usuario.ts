import mongoose, { Schema, Document } from 'mongoose';
import { BaseBancoDeDados } from '../../config/connection';
import { typeEndereco } from '../../types/fornecedorType';
import { typeFormaPagamento } from '../../types/usuarioType';

export interface IUsuario extends Document {
    nome: string;
    senha: string;
    telefone:string;
    email:string;
    formaPagamento:typeFormaPagamento[];
    endereco:typeEndereco;
    historico_servicos: string[];
}

const enderecoSchema = new Schema({
    rua: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true }
});

const formaPagamentoSchema = new Schema({
    tipo: { type: String, enum: ['cartão', 'pix', 'boleto'], required: true },
    detalhes: { type: String, required: true }
});

export class Usuario extends BaseBancoDeDados {
    private schema: Schema<IUsuario>;
    private model;

    constructor() {
        super();
        
        this.schema = new Schema<IUsuario>({
            nome: { type: String, required: true },
            senha: { type: String, required: true },
            telefone:{ type:String, required:true },
            email:{ type:String, required:true },
            formaPagamento: [{ type:formaPagamentoSchema,require:true }],
            endereco: { type: enderecoSchema, required: true },
            historico_servicos: [{ type: String }]
        });

        this.model = mongoose.model<IUsuario>('usuarios', this.schema);
        
    }

    public getModel() {
        return this.model;
    }
}


