import mongoose, { Schema, Document } from 'mongoose';
import { BaseBancoDeDados } from '../../config/connection';

export interface IUsuario extends Document {
    nome: string;
    senha: string;
    telefone:string;
    email:string;
    formaPagamento:string;
}

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
            formaPagamento: { type:String,require:true }
        });

        this.model = mongoose.model<IUsuario>('usuarios', this.schema);
        
    }

    public getModel() {
        return this.model;
    }
}


