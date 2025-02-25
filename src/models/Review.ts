import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>('Review', ReviewSchema);