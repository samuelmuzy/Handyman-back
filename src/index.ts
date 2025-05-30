import http from 'http';
import { Server } from 'socket.io';
import { app } from './app';
import { fornecedorRouter } from './routes/fornecedor/FornecedorRoutes';
import { usuarioRouter } from './routes/usuario/UsuarioRoutes';
import faqRouter from './routes/faq/FaqRoutes';
import { MensagemService } from './service/mensagem/MensagemService';
import { mensagemRouter } from './routes/mensagem/mensagemRoutes';
import { pagamentoRouter } from './routes/pagamento/PagamentoRouter';
import { servicoRouter } from './routes/servicoAgendado/ServicoRoutes';
import avaliacaoRouter from './routes/avaliacao/AvaliacaoRoutes';


// Rotas
app.use('/usuarios', usuarioRouter);
app.use('/fornecedor', fornecedorRouter);
app.use('/faq', faqRouter);
app.use('/mensagem', mensagemRouter);
app.use('/pagamento',pagamentoRouter);
app.use('/servicos',servicoRouter);
app.use('/avaliacao',avaliacaoRouter);

// Cria servidor HTTP com Express
const server = http.createServer(app);

// Cria Socket.IO
export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Instância do service
const mensagemService = new MensagemService();

// Eventos do socket
io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });

    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`Usuário ${userId} entrou na sala ${userId}`);
    });

    socket.on('mensagem', async (msg) => {
        const novaMsg = await mensagemService.enviarMensagem(msg);
        io.to(msg.remetenteId).emit('nova_mensagem', novaMsg);
        io.to(msg.destinatarioId).emit('nova_mensagem', novaMsg);
    });

    // Novo evento para mudança de status
    socket.on('mudanca_status', async (data) => {
        const { id_servico, novo_status, id_usuario, id_fornecedor } = data;
        
        // Emite para o usuário
        io.to(id_usuario).emit('atualizacao_status', {
            id_servico,
            novo_status,
            timestamp: new Date()
        });

        // Emite para o fornecedor
        io.to(id_fornecedor).emit('atualizacao_status', {
            id_servico,
            novo_status,
            timestamp: new Date()
        });
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3003;

// Usar server.listen() para iniciar o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
