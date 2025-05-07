import mongoose, { Schema, Document } from 'mongoose';

export interface IMensagem extends Document {
  remetenteId: string;
  destinatarioId: string;
  texto: string;
  nomeDestinatario:string;
  dataEnvio: Date;
}

const MensagemSchema = new Schema<IMensagem>({
    remetenteId: { type: String, required: true },
    destinatarioId: { type: String, required: true },
    nomeDestinatario:{ type:String , required:true },
    texto: { type: String, required: true },
    dataEnvio: { type: Date, default: Date.now }
});

export const MensagemModel = mongoose.model<IMensagem>('Mensagem', MensagemSchema);
