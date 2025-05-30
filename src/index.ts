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
import { SocketConfig } from './config/Socket';


// Rotas
app.use('/usuarios', usuarioRouter);
app.use('/fornecedor', fornecedorRouter);
app.use('/faq', faqRouter);
app.use('/mensagem', mensagemRouter);
app.use('/pagamento',pagamentoRouter);
app.use('/servicos',servicoRouter);
app.use('/avaliacao',avaliacaoRouter);

/// Cria servidor HTTP
const server = http.createServer(app);

// Configura Socket.IO
const socketConfig = new SocketConfig(server);

// Inicia o servidor
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporta a instância do Socket.IO para uso em outros arquivos
export const io = socketConfig.getIO();