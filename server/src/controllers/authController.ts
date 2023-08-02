import { Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await authService.hashPassword(password);
        const newUser: IUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        const token = authService.generateJWT(newUser);

        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ user: newUser, token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user: IUser | null = await UserModel.findOne({ email }); // Use UserModel here
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await authService.comparePasswords(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = authService.generateJWT(user);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ user, token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const isLoggedIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'You are not logged in.' });
            return;
        }

        const decoded: any = authService.verifyToken(token, process.env.SECRET_KEY ?? '');
        if (!decoded) {
            res.json({ message: 'Invalid token. Please log in again.' });
            return;
        }

        res.status(200).json({
            message: 'You are logged in.',
            user: decoded.userId
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Successfully logged out.' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};