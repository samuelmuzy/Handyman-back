export type typeEndereco = {
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
}

export type typeDisponibilidade = {
    data: string;
    horario: string;
    status: 'livre' | 'ocupado';
}

export type typeFornecedor = {
    id_fornecedor?: string;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    endereco: typeEndereco;
    categoria_servico: string[];
    descricao: string;
    sub_descricao:string;
    imagemPerfil:string;
    imagemIlustrativa:string;
    valor:number;
    disponibilidade: typeDisponibilidade[];
    solicitacoes: string[];
    media_avaliacoes: number;
} 