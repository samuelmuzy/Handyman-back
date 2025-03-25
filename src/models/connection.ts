import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export abstract class BaseBancoDeDados {
    protected async conectar(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_URI as string, {
                dbName: process.env.DB_NAME_PATIENT, // Nome do banco de dados
            });
            console.log('✅ Conectado ao MongoDB com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao conectar ao MongoDB:', error);
            process.exit(1); // Encerra o processo em caso de erro
        }
    }
}
