import { typeEndereco } from "./fornecedorType";

export type typeUsuario = {
    nome:string;
    email:string;
    senha:string;
    telefone:string;
    formaPagamento:typeFormaPagamento[];
    endereco:typeEndereco;
    historico_servicos: string[];
    autenticacaoVia?: string; // 'local' ou 'google'
}

export type typeFormaPagamento = {
    tipo: 'cartão' | 'pix' | 'boleto' | string; // você pode expandir os tipos aceitos
    detalhes: string;
};
  
export type typePagamento = {
    formas_pagamento: typeFormaPagamento[];
};

export type typeUsuarioGoogle = {
    email: string;
    nome: string;
    sub: string;
    picture: string;
    autenticacaoVia: string;
}
  