import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env['MONGODB_URL'];
        await mongoose.connect(mongoUri as string);
        console.log('MongoDB Connected...');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;