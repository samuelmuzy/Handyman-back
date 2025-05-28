import { Iservico } from "../models/servicoAgendado/Servico";

export interface typeServico {
    id_servico: string,
    id_usuario: string;
    id_fornecedor: string;
    categoria: string;
    data: Date;
    horario: Date;
    status: string;
    id_pagamento?: string;
    id_avaliacao?: string;
    descricao: string;
}

export interface ServicoComFornecedor {
    id_servico: string;
    id_fornecedor?:string;
    id_usuario: string;
    categoria: string;
    data: Date;
    horario: Date;
    status: string;
    id_pagamento?: string;
    id_avaliacao?: string;
    descricao: string;
    fornecedor: {
        nome: string;
        email: string;
        telefone: string;
        categoria_servico: string[];
        media_avaliacoes: number;
    } | null;
}