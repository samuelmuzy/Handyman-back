import { app } from './app';
import { usuarioRouter } from './routes/Usuario/UsuarioRoutes';

app.use('/usuarios',usuarioRouter);
