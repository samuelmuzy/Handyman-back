import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const generateToken = (input: payload): string => {
    return jwt.sign(
        input,
        String(process.env.JWT_KEY),
        { expiresIn: '1d' }
    );
};

export const getTokenData = (token: string): payload | null => {
    try {
        const { id,role,email,imagemPerfil,nome } = jwt.verify(token, String(process.env.JWT_KEY)) as payload;
        return { id,nome,email,imagemPerfil,role };
    } catch (error) {
        return null;
    }
};

export type payload = {
    id: string,
    nome:string,
    email:string,
    imagemPerfil:string,
    role: string
}