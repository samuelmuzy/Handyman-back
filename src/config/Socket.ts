// src/config/socket.ts
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { MensagemService } from '../service/mensagem/MensagemService';
import { IMensagem } from '../models/mensagem/MensagemModel';


// Interface para os eventos de status
interface StatusEvent {
    id_servico: string;
    novo_status: string;
    id_usuario: string;
    id_fornecedor: string;
}

// Interface para as atualizações de status
interface StatusUpdate {
    id_servico: string;
    novo_status: string;
    timestamp: Date;
}

// Interface para novo agendamento
interface NovoAgendamentoEvent {
    id_servico: string;
    id_fornecedor: string;
    categoria: string;
    data: Date;
    horario: Date;
    status: string;
    descricao: string;
}

export class SocketConfig {
    private io: Server;
    private mensagemService: MensagemService;

    constructor(server: HttpServer) {
        // Configuração inicial do Socket.IO
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            },
            pingTimeout: 60000, // Timeout para ping
            pingInterval: 25000 // Intervalo de ping
        });

        this.mensagemService = new MensagemService();
        this.configureEvents();
    }

    private configureEvents(): void {
        this.io.on('connection', (socket) => {
            console.log('Usuário conectado:', socket.id);

            // Evento de desconexão
            socket.on('disconnect', () => {
                console.log('Usuário desconectado:', socket.id);
            });

            // Evento de entrada em sala
            socket.on('join', (userId: string) => {
                socket.join(userId);
                console.log(`Usuário ${userId} entrou na sala ${userId}`);
            });

            // Evento de mensagem
            socket.on('mensagem', async (msg: IMensagem) => {
                try {
                    const novaMsg = await this.mensagemService.enviarMensagem(msg);

                    this.io.to(msg.remetenteId).emit('nova_mensagem', novaMsg);
                    this.io.to(msg.destinatarioId).emit('nova_mensagem', novaMsg);
                } catch (error) {
                    console.error('Erro ao enviar mensagem:', error);
                    socket.emit('erro_mensagem', { 
                        mensagem: 'Erro ao enviar mensagem' 
                    });
                }
            });

            // Evento de mudança de status
            socket.on('mudanca_status', async (data: StatusEvent) => {
                try {
                    const { id_servico, novo_status, id_usuario, id_fornecedor } = data;
                    
                    const update: StatusUpdate = {
                        id_servico,
                        novo_status,
                        timestamp: new Date()
                    };

                    // Emite para o usuário
                    this.io.to(id_usuario).emit('atualizacao_status', update);

                    // Emite para o fornecedor
                    this.io.to(id_fornecedor).emit('atualizacao_status', update);
                } catch (error) {
                    console.error('Erro ao atualizar status:', error);
                    socket.emit('erro_status', { 
                        mensagem: 'Erro ao atualizar status' 
                    });
                }
            });

            // Novo evento: novo agendamento
            socket.on('novo_agendamento', (data: NovoAgendamentoEvent) => {
                // Emite o evento de novo agendamento para o fornecedor específico
                this.io.to(data.id_fornecedor).emit('novo_agendamento', data);
                
            });
        });
    }

    // Método para emitir eventos de status
    public emitirAtualizacaoStatus(update: StatusUpdate, id_usuario: string, id_fornecedor: string): void {
        this.io.to(id_usuario).emit('atualizacao_status', update);
        this.io.to(id_fornecedor).emit('atualizacao_status', update);
    }

    // Método para emitir novas mensagens
    public emitirNovaMensagem(mensagem: IMensagem): void {
        this.io.to(mensagem.remetenteId).emit('nova_mensagem', mensagem);
        this.io.to(mensagem.destinatarioId).emit('nova_mensagem', mensagem);
    }

    // Método para emitir novo agendamento
    public emitirNovoAgendamento(agendamento: NovoAgendamentoEvent): void {
        this.io.to(agendamento.id_fornecedor).emit('novo_agendamento', agendamento);
    }

    // Getter para a instância do Socket.IO
    public getIO(): Server {
        return this.io;
    }
}