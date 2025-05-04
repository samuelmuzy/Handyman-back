import mongoose, { Schema, Document } from 'mongoose';
import { BaseBancoDeDados } from '../../config/connection';
import { typeEndereco, typeDisponibilidade } from '../../types/fornecedorType';

export interface IFornecedor extends Document {
    id_fornecedor: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    endereco: typeEndereco;
    categoria_servico: string[];
    valor:number;
    sub_descricao:string;
    imagemPerfil:string;
    imagemIlustrativa:string;
    descricao: string;
    disponibilidade: typeDisponibilidade[];
    solicitacoes: string[];
    media_avaliacoes: number;
}

const enderecoSchema = new Schema({
    rua: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true }
});

const disponibilidadeSchema = new Schema({
    data: { type: String, required: true },
    horario: { type: String, required: true },
    status: { type: String, enum: ['livre', 'ocupado'], required: true }
});

export class Fornecedor extends BaseBancoDeDados {
    private schema: Schema<IFornecedor>;
    private model;

    constructor() {
        super();

        this.schema = new Schema<IFornecedor>({
            id_fornecedor: { type: String, required: true, unique: true },
            nome: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            telefone: { type: String, required: true },
            senha: { type: String, required: true },
            endereco: { type: enderecoSchema, required: true },
            imagemPerfil: { type:String, default: null },
            imagemIlustrativa:{ type:String, default:null },
            categoria_servico: [{ type: String, required: true }],
            descricao: { type: String, required: true },
            sub_descricao: { type:String, required:true },
            valor:{ type:Number,required:true },
            disponibilidade: [{ type: disponibilidadeSchema, required: true }],
            solicitacoes: [{ type: String }],
            media_avaliacoes: { type: Number, default: 0 }
        });

        this.model = mongoose.model<IFornecedor>('fornecedores', this.schema);
    }

    public getModel() {
        return this.model;
    }
} 