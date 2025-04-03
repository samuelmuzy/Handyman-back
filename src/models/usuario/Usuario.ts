import mongoose, { Schema, Document } from 'mongoose';
import { BaseBancoDeDados } from '../../config/connection';

export interface IUsuario extends Document {
    nome: string;
    sobrenome: string;
}

export class Usuario extends BaseBancoDeDados {
    private schema: Schema<IUsuario>;
    private model;

    constructor() {
        super();
        
        this.schema = new Schema<IUsuario>({
            nome: { type: String, required: true },
            sobrenome: { type: String, required: true }
        });

        this.model = mongoose.model<IUsuario>('usuarios', this.schema);
        
    }

    public getModel() {
        return this.model;
    }
}


