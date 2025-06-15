import mongoose, { Schema, Document } from 'mongoose';

export interface Iservico extends Document {
  id_servico: string;
  id_usuario: string;
  id_fornecedor: string;
  categoria: string;
  data: Date;
  horario: Date;
  data_submisao:Date;
  valor:number;
  imagems:string[]
  status: string;
  id_pagamento: string;
  id_avaliacao: string;
  descricao:string;
  avaliado:boolean;
}

const ServicoSchema = new Schema<Iservico>({
  id_servico: { type: String, required: true },
  id_usuario: { type: String, required: true },
  id_fornecedor: { type: String, required: true },
  descricao: { type:String , require:true},
  categoria: { type: String, required: true },
  data: { type: Date, required: true },
  valor:{type:Number , required:false},
  imagems:[{ type:String }],
  horario: { type: Date, required: true },
  data_submisao:{type:Date, required:true},
  status: { type: String, required: true },
  id_pagamento: { type: String, required: false },
  id_avaliacao: { type: String, required: false },
  avaliado:{type:Boolean, default:false}
});

export const ServicoModel = mongoose.model<Iservico>('Servico', ServicoSchema);