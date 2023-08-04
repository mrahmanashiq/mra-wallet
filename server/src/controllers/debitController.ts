import { Request, Response } from 'express';
import { IDebit, DebitModel } from '../models/debit';

export const getDebits = async (req: Request, res: Response): Promise<void> => {
    try {
        const debits: IDebit[] = await DebitModel.find();
        res.status(200).json({ debits });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDebit = async (req: Request, res: Response): Promise<void> => {
    try {
        const debit: IDebit | null = await DebitModel.findById(req.params.id);
        if (!debit) {
            res.status(404).json({ message: 'Debit not found' });
            return;
        }
        res.status(200).json({ debit });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createDebit = async (req: Request, res: Response): Promise<void> => {
    try {
        const newDebit: IDebit = new DebitModel(req.body);
        const savedDebit = await newDebit.save();
        res.status(201).json({ debit: savedDebit });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDebit = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedDebit: IDebit | null = await DebitModel.findByIdAndUpdate(
            { _id: req.params.id },
            req.body
        );
        if (!updatedDebit) {
            res.status(404).json({ message: 'Debit not found' });
            return;
        }
        res.status(200).json({ debit: updatedDebit });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDebit = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedDebit: IDebit | null = await DebitModel.findByIdAndRemove(
            req.params.id
        );
        if (!deletedDebit) {
            res.status(404).json({ message: 'Debit not found' });
            return;
        }
        res.status(200).json({ debit: deletedDebit });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDebitsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const debits: IDebit[] = await DebitModel.find({ userId: req.params.userId });
        res.status(200).json({ debits });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDebitsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const debits: IDebit[] = await DebitModel.find({ category: req.params.category });
        res.status(200).json({ debits });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDebitsByDate = async (req: Request, res: Response): Promise<void> => {
    try {
        const debits: IDebit[] = await DebitModel.find({ date: req.params.date });
        res.status(200).json({ debits });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};