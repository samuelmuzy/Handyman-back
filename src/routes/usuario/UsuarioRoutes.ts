import  express  from 'express';
import { UsuarioController } from '../../controllers/usuario/UsuarioController';

export const usuarioRouter = express.Router();

const usuarioController = new UsuarioController();

usuarioRouter.post('/',usuarioController.criar);
