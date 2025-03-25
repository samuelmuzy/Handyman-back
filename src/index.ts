import { app } from './app';
import { BaseBancoDeDados } from './models/connection';
import { UsuarioModel } from './models/usuarioModel/UsuarioModel';

class TesteBanco extends BaseBancoDeDados{
    public async testeBanco(){
        await this.conectar();
    }

    public async pesquisarBanco(){
        const nome = await UsuarioModel.find();
        return nome;
    }
}



app.use('/api', async (req, res) => {
    const testeBanco = new TesteBanco();
    testeBanco.testeBanco();
    const resultado = await testeBanco.pesquisarBanco();
    
    res.send( resultado );
});