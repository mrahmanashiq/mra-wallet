import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export const generateJWT = (user: IUser): string => {
    const secretKey: any = process.env.SECRET_KEY;
    return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string, secretKey: string): any => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};