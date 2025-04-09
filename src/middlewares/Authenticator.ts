import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

interface AuthenticationData { id: string,role:string }

dotenv.config();

export const generateToken = (input: AuthenticationData): string => {
    return jwt.sign(
        input,
        String(process.env.JWT_KEY),
        { expiresIn: '1d' }
    );
};

export const getTokenData = (token: string): AuthenticationData | null => {
    try {
        const { id,role } = jwt.verify(token, String(process.env.JWT_KEY)) as AuthenticationData;
        return { id,role };
    } catch (error) {
        return null;
    }
};