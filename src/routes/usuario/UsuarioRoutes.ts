import  express  from 'express';
import { UsuarioController } from '../../controllers/Usuario/UsuarioController';

export const usuarioRouter = express.Router();

const usuarioController = new UsuarioController();

usuarioRouter.post('/',usuarioController.criar);
usuarioRouter.get('/',usuarioController.buscar);
