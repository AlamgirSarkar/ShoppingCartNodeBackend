import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>('Cart', CartSchema);