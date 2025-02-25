import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
  Vendor = 'vendor'
}

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: UserRole, default: UserRole.Customer },
  refresh_token: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);