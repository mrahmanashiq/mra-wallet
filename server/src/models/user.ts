import mongoose, { Document, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

export const UserModel = mongoose.model<IUser>('User', userSchema);
