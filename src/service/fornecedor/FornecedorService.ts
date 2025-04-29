import { IFornecedor } from '../../models/fornecedor/Fornecedor';
import { FornecedorRepository } from '../../repositories/fornecedor/FornecedorRepository';
import { typeFornecedor } from '../../types/fornecedorType';
import { CustomError } from '../CustomError';
import { BaseService } from '../BaseService';
import { hash, compare } from '../../middlewares/hashManager';
import { generateToken } from '../../middlewares/Authenticator';

export class FornecedorService extends BaseService {
    private fornecedorRepository: FornecedorRepository;

    constructor(fornecedorRepository?: FornecedorRepository) {
        super();
        this.fornecedorRepository = fornecedorRepository || new FornecedorRepository();
    }

    public async criarFornecedor(fornecedor: typeFornecedor): Promise<IFornecedor> {
        try {
            this.validateRequiredFields(fornecedor, [
                'nome',
                'email',
                'telefone',
                'senha',
                'endereco',
                'categoria_servico',
                'descricao'
            ]);

            const emailExiste = await this.fornecedorRepository.buscarFornecedorPorEmail(fornecedor.email);
            if (emailExiste) {
                throw new CustomError('Email já cadastrado', 400);
            }

            const senhaHash = await hash(fornecedor.senha);
            fornecedor.senha = senhaHash;

            // Gerar ID único para o fornecedor
            fornecedor.id_fornecedor = Math.random().toString(36).substring(2, 15);

            return await this.fornecedorRepository.criarFornecedor(fornecedor);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async login(email: string, senha: string): Promise<string> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorEmail(email);
            if (!fornecedor) {
                throw new CustomError('Email não encontrado', 404);
            }

            const senhaCorreta = await compare(senha, fornecedor.senha);
            if (!senhaCorreta) {
                throw new CustomError('Senha incorreta', 401);
            }

            const token = generateToken({ id: fornecedor.id_fornecedor, role: 'fornecedor' });
            return token;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async buscarFornecedores(): Promise<typeFornecedor[]> {
        try {
            const fornecedores = await this.fornecedorRepository.buscarFornecedores();
            if (fornecedores.length === 0) {
                throw new CustomError('Nenhum fornecedor encontrado', 404);
            }
            return fornecedores;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async buscarFornecedorPorId(id: string): Promise<typeFornecedor> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorId(id);
            if (!fornecedor) {
                throw new CustomError('Fornecedor não encontrado', 404);
            }
            return fornecedor;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async buscarFornecedorPorCategoria (id:string):Promise<typeFornecedor>{
        try {
            const fornecedores = await this.fornecedorRepository.buscarFornecedoresPorCategoria(id)
            if(!fornecedores){
                throw new CustomError('Categoria inexistente',404)
            }
            return fornecedores
        } catch (error) {
            if(error instanceof CustomError){
                throw new CustomError(error.message,error.statusCode)
            }else{
                throw new CustomError('Erro desconhecido',500)
            }
        }
    }

    public async atualizarFornecedor(id: string, dados: Partial<typeFornecedor>): Promise<IFornecedor> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorId(id);
            if (!fornecedor) {
                throw new CustomError('Fornecedor não encontrado', 404);
            }

            if (dados.senha) {
                dados.senha = await hash(dados.senha);
            }

            const fornecedorAtualizado = await this.fornecedorRepository.atualizarFornecedor(id, dados);
            if (!fornecedorAtualizado) {
                throw new CustomError('Erro ao atualizar fornecedor', 500);
            }
            return fornecedorAtualizado;
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async adicionarSolicitacao(id: string, idSolicitacao: string): Promise<void> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorId(id);
            if (!fornecedor) {
                throw new CustomError('Fornecedor não encontrado', 404);
            }

            await this.fornecedorRepository.adicionarSolicitacao(id, idSolicitacao);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async atualizarDisponibilidade(id: string, disponibilidade: any): Promise<void> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorId(id);
            if (!fornecedor) {
                throw new CustomError('Fornecedor não encontrado', 404);
            }

            await this.fornecedorRepository.atualizarDisponibilidade(id, disponibilidade);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async atualizarMediaAvaliacoes(id: string, media: number): Promise<void> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorId(id);
            if (!fornecedor) {
                throw new CustomError('Fornecedor não encontrado', 404);
            }

            await this.fornecedorRepository.atualizarMediaAvaliacoes(id, media);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }

    public async deletarFornecedor(id: string): Promise<void> {
        try {
            const fornecedor = await this.fornecedorRepository.buscarFornecedorPorId(id);
            if (!fornecedor) {
                throw new CustomError('Fornecedor não encontrado', 404);
            }

            await this.fornecedorRepository.deletarFornecedor(id);
        } catch (error: unknown) {
            this.handleError(error);
        }
    }
} 