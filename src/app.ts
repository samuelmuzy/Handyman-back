import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

/*import servicosRoutes from '../src/routes/servico/ServicoRoutes';

app.use('/api/servicos', servicosRoutes);
*/
app.listen(3003, () => {
    console.log('Server started on http://localhost:3003');
});