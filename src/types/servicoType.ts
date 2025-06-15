import { typeEndereco } from "./fornecedorType";


export interface typeServico {
    id_servico: string,
    id_usuario: string;
    id_fornecedor: string;
    categoria: string;
    data_submisao:Date;
    imagems?:string[]
    valor:number,
    data: Date;
    horario: Date;
    status: string;
    avaliado:boolean;
    id_pagamento?: string;
    id_avaliacao?: string;
    descricao: string;
}

export interface ServicoComFornecedor {
    id_servico: string;
    id_fornecedor?:string;
    id_usuario: string;
    categoria: string;
    imagems?:string[];
    valor:number;
    data_submisao:Date;
    data: Date;
    horario: Date;
    status: string;
    id_pagamento?: string;
    id_avaliacao?: string;
    descricao: string;
    avaliado:boolean;
    fornecedor: {
        nome: string;
        imagemPerfil:string
        email: string;
        telefone: string;
        categoria_servico: string[];
        media_avaliacoes: number;
    } | null;
}

export interface ServicoComUsuario {
    id_servico: string;
    id_fornecedor: string;
    id_usuario: string;
    imagems: string[];
    data_submisao: Date;
    categoria: string;
    data: Date;
    horario: Date;
    status: string;
    id_pagamento?: string;
    id_avaliacao?: string;
    descricao: string;
    valor: number;
    usuario: {
        imagemPerfil: string;
        nome: string;
        email: string;
        telefone: string;
        endereco:typeEndereco
    } | null;
}