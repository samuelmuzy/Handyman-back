import { app } from './app';
import { fornecedorRouter } from './routes/fornecedor/FornecedorRoutes';
import { usuarioRouter } from './routes/usuario/UsuarioRoutes';

app.use('/usuarios',usuarioRouter);
app.use('/fornecedor',fornecedorRouter);
