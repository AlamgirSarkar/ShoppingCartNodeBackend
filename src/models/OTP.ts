import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
    user_id: mongoose.Types.ObjectId; //To define relationship
    email: string;
    otp: string;
    purpose: string;
    expires_at: Date;
}

const OtpSchema: Schema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    otp: { type: String, required: true },
    purpose: { type: String, required: true },
    expires_at: { type: Date, required: true }
},
{ timestamps: { createdAt: 'created_at' } }); //This creates the timestamps for the schema

export default mongoose.model<IOtp>('Otp', OtpSchema);