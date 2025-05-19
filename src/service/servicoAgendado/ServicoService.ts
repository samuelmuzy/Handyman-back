import { Iservico } from "../../models/servicoAgendado/Servico";
import { FornecedorRepository } from "../../repositories/fornecedor/FornecedorRepository";
import { ServicoRepository } from "../../repositories/servicoAgendado/ServivoRepository";
import { UsuarioRepository } from "../../repositories/usuario/UsuarioRepository";
import { typeServico } from "../../types/servicoType";
import { BaseService } from "../BaseService";
import { CustomError } from "../CustomError";

export class ServicoService extends BaseService {
    private servicoRepository = new ServicoRepository();
    private fornecedorRepository = new FornecedorRepository();
    private usuarioRepository = new UsuarioRepository();

    //Salva a soliçitação na tabela de serviços e também adiciona o id da tabela serviços ao fornecedor
    public async criarServico(servico:typeServico):Promise<Iservico>{
        try{
            this.validateRequiredFields(servico,['id_fornecedor','id_usuario','status','categoria','data','horario','descricao'])

            const fornecedorExiste = await this.fornecedorRepository.buscarFornecedorPorId(servico.id_fornecedor);

            if(!fornecedorExiste){
                throw new CustomError('Fornecedor não encontrado', 404)
            }
            
            const usuarioExiste = await this.usuarioRepository.buscarPorId(servico.id_usuario);

            if(!usuarioExiste){
                throw new CustomError('Usuário não encontrado',404);
            }

            await this.fornecedorRepository.adicionarSolicitacao(servico.id_fornecedor,servico.id_servico);

            return await this.servicoRepository.criarServico(servico);

        }catch(error){
            this.handleError(error);
        }
    }
}