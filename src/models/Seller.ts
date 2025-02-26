import mongoose, { Schema, Document } from 'mongoose';

export interface ISeller extends Document {
  name: string;
  description: string;
  pincodes: string[];  
  user_id: mongoose.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    pincodes: { type: [String], required: true, default: [] }, 
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' }, 
  },
  { timestamps: true }
);

export default mongoose.model<ISeller>('Seller', SellerSchema);