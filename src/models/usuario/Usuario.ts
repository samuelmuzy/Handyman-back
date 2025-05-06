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
    autenticacaoVia: string;
    sub:string;
    picture:string
     // 'local' ou 'google'
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
            senha: { type: String, required: false }, // Opcional para Google
            telefone: { type: String, required: false }, // Opcional
            email: { type: String, required: true },
            formaPagamento: [{ type: formaPagamentoSchema, required: false }],
            endereco: { type: enderecoSchema, required: false },
            historico_servicos: [{ type: String }],
            autenticacaoVia: { type: String, enum: ['local', 'google'], default: 'local' },
            sub: { type: String, required: false }, // Opcional para Google
            picture: { type: String, required: false } // Opcional para Google
        });
        

        this.model = mongoose.model<IUsuario>('usuarios', this.schema);
        
    }

    public getModel() {
        return this.model;
    }
}


