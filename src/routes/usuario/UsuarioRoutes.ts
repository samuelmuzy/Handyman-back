import  express  from 'express';
import { UsuarioController } from '../../controllers/Usuario/UsuarioController';

export const usuarioRouter = express.Router();

const usuarioController = new UsuarioController();

usuarioRouter.post('/',usuarioController.criarUsuario);
usuarioRouter.get('/',usuarioController.buscarUsuarios);
usuarioRouter.post('/login',usuarioController.login);
