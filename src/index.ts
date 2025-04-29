import { app } from './app';
import { fornecedorRouter } from './routes/fornecedor/FornecedorRoutes';
import { usuarioRouter } from './routes/usuario/UsuarioRoutes';
import faqRouter from './routes/faq/faqRoutes';

app.use('/usuarios', usuarioRouter);
app.use('/fornecedor', fornecedorRouter);
app.use('/faq', faqRouter);
