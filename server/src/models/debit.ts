import mongoose, { Document, Schema } from 'mongoose';

const debitSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export interface IDebit extends Document {
    amount: number;
    description: string;
    date: Date;
    user: Schema.Types.ObjectId;
}

export const DebitModel = mongoose.model<IDebit>('Debit', debitSchema);