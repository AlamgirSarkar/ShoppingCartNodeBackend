import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category_id: mongoose.Types.ObjectId;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category_id: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  image_url: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model<IProduct>('Product', ProductSchema);