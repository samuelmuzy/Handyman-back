import mongoose, { Schema, Document } from 'mongoose';

// Definir a estrutura do paciente
interface IUsuario extends Document {
    nome: string;
    sobrenome: string;
}

// Criar o Schema
const usuarioSchema = new Schema<IUsuario>({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true }
});

// Criar e exportar o modelo
export const UsuarioModel = mongoose.model<IUsuario>('usuarios', usuarioSchema);