import  express  from 'express';
import { UsuarioController } from '../../controllers/usuario/UsuarioController';

export const usuarioRouter = express.Router();

const usuarioController = new UsuarioController();

usuarioRouter.post('/',usuarioController.criarUsuario);
usuarioRouter.get('/',usuarioController.buscarUsuarios);
usuarioRouter.get('/historico/:id',usuarioController.buscarHistoricoDeServicosPorId)
usuarioRouter.post('/login-user',usuarioController.login);
usuarioRouter.put('/users/:id',usuarioController.updateUser);
