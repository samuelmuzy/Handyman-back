import http from 'http';
import { Server } from 'socket.io';
import { app } from './app';
import { fornecedorRouter } from './routes/fornecedor/FornecedorRoutes';
import { usuarioRouter } from './routes/usuario/UsuarioRoutes';
import faqRouter from './routes/faq/FaqRoutes';
import { MensagemService } from './service/mensagem/MensagemService';
import { mensagemRouter } from './routes/mensagem/mensagemRoutes';

// Rotas
app.use('/usuarios', usuarioRouter);
app.use('/fornecedor', fornecedorRouter);
app.use('/faq', faqRouter);
app.use('/mensagem',mensagemRouter);

// Cria servidor HTTP com Express
const server = http.createServer(app);

// Cria Socket.IO
const io = new Server(server, {
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

    socket.on('mensagem', async (msg) => {
        const novaMsg = await mensagemService.enviarMensagem(msg);

        // Emite para ambos os usuários
        io.to(msg.remetenteId).emit('nova_mensagem', novaMsg);
        io.to(msg.destinatarioId).emit('nova_mensagem', novaMsg);
    });

    socket.on('join', (userId) => {
        socket.join(userId); // Cada usuário entra em sua "sala"
    });
});

// Inicia o servidor
server.listen(3003, () => {
    console.log('Servidor rodando em http://localhost:3003');
});
