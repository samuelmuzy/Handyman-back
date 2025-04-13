import { app } from './app';
import { usuarioRouter } from './routes/usuario/UsuarioRoutes';

app.use('/usuarios',usuarioRouter);
