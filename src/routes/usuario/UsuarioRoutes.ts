import  express  from 'express';
import { UsuarioController } from '../../controllers/usuario/UsuarioController';

export const usuarioRouter = express.Router();

const usuarioController = new UsuarioController();

usuarioRouter.post('/',usuarioController.criarUsuario);
usuarioRouter.get('/',usuarioController.buscarUsuarios);
usuarioRouter.get('/buscar-id/:id',usuarioController.buscarUsuariosPorId);
usuarioRouter.get('/verificar-email/usuario',usuarioController.verificarEmailUsuario);
usuarioRouter.get('/historico/:id',usuarioController.buscarHistoricoDeServicosPorId);
usuarioRouter.post('/login',usuarioController.login);
usuarioRouter.post('/login/google',usuarioController.criarUsuarioGoogle);
usuarioRouter.put('/users/:id',usuarioController.updateUser);
