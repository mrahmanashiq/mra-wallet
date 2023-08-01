import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI: string | undefined = process.env.MONGO_URI;
        if (!mongoURI) {
            console.error('MONGO_URI environment variable is not defined.');
            process.exit(1);
        }
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
